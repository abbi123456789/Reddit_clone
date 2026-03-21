from litestar import Controller, get, post, Request
from typing import Any

from .tables import Comment, CommentVote
from .schema import CommentSchema, CommentVoteSchema
from accounts.tables import User
from community.tables import Community

class CommentController(Controller):
    path = 'r/{community_name:str}/comments/{post_id:int}'

    @post('/create')
    async def create_comment(self, request:Request[User, Any, Any], data: CommentSchema)->dict[str, Any]:

        user_id = request.user.get('id')
        community = await Community.select(Community.id).where(Community.name == data.community_name).first()
        community_id = community.get('id') if community else None
        comment = Comment(
            content_json = data.content_json,
            content_html = data.content_html,
            parent = data.parent,
            post = data.post,
            community = community_id,
            author = user_id
            )
        await comment.save()
        return comment.to_dict()

    @get('/')
    async def get_post_comments(self, request:Request[User, Any, Any])->list:
        post_id = request.path_params['post_id']
        sql_statements = '''
        SELECT c.id, c.content_json, c.content_html,
        u.id AS author_id, u.username AS author_name
        FROM comments c
        LEFT JOIN users u ON c.author = u.id
        LEFT JOIN post p ON c.post = {};
        '''
        comments = await Comment.raw(sql_statements, post_id)
        print(comments)
        return comments
    
    @get('/{comment_id:int}/vote')
    async def vote_comment(self, data:CommentVoteSchema, request:Request[User, Any, Any], comment_id:int)->None:
        user_id = request.user.get('id')
        sql_statement = '''
        WITH existing AS (
            SELECT value FROM comment_votes WHERE comment = {} AND voter = {}
        ),
        action AS (
            INSERT INTO comment_votes (comment, voter, value)
            VALUES ({}, {}, {})
            ON CONFLICT (comment, voter)
            DO UPDATE SET value = EXCLUDED.value
            WHERE comment_votes.value != EXCLUDED.value
            RETURNING (SELECT value FROM existing) AS old_value, value AS new_value, 'voted' AS state
        ),
        deletion AS (
            DELETE FROM comment_votes
            WHERE comment = {} AND voter = {} AND value = {}
            AND NOT EXISTS (SELECT 1 FROM action)
            RETURNING {} AS deleted_value, 'toggled' AS state
        ),
        status_check AS (
            SELECT
                CASE
                    WHEN (SELECT new_value FROM action) = 1 THEN 'upvoted'
                    WHEN (SELECT new_value FROM action) = -1 THEN 'downvoted'
                    WHEN EXISTS (SELECT 1 FROM deletion) THEN 'toggled_off'
                    ELSE 'no_change'
                END AS vote_status
        )
        UPDATE comments
            SET score = score + CASE
                WHEN EXISTS (SELECT 1 FROM action) THEN
                    CASE
                        WHEN (SELECT old_value FROM action) IS NULL THEN (SELECT new_value FROM action)
                        ELSE (SELECT new_value FROM action) - (SELECT old_value FROM action)
                    END
                WHEN EXISTS (SELECT 1 FROM deletion) THEN -(SELECT deleted_value FROM deletion)
                ELSE 0
            END
            WHERE id = {};
                    RETURNING id AS comment_id, score AS new_score, (SELECT vote_status FROM status_check) AS status;
        '''
        await CommentVote.raw(sql_statement, comment_id, user_id, comment_id, user_id, data.value, comment_id, user_id, data.value, data.value, comment_id)