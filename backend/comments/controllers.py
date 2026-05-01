from litestar import Controller, get, post, Request
from typing import Any

from .tables import Comment, CommentVote
from .schema import CommentSchema, CommentVoteSchema
from accounts.tables import User
from community.tables import Community

class CommentController(Controller):
    path = '/'

    @post('r/{community_name:str}/comments/{post_id:int}/create')
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

    @get('r/{community_name:str}/comments/{post_id:int}/')
    async def get_post_comments(self, request:Request[User, Any, Any])->list:
        post_id = request.path_params['post_id']
        if request.user:
            user_id = request.user.get('id')
            sql_statements = '''
            SELECT c.id, c.content_json, c.content_html, c.score, c.depth, c.parent,
            u.id AS author_id, u.username AS author_name,
            CASE
                WHEN cv.value = 1 THEN 'upvoted'
                WHEN cv.value = -1 THEN 'downvoted'
                ELSE 'not_voted'
            END AS vote_status
            FROM comments c
            LEFT JOIN users u ON c.author = u.id
            LEFT JOIN comment_votes cv ON c.id = cv.comment AND cv.voter = {}
            WHERE c.post = {};
            '''
            comments = await Comment.raw(sql_statements, user_id, post_id)
        else:
            sql_statements = '''
            SELECT c.id, c.content_json, c.content_html, c.score, c.depth, c.parent,
            u.id AS author_id, u.username AS author_name
            FROM comments c
            LEFT JOIN users u ON c.author = u.id
            WHERE c.post = {};
            '''
            comments = await Comment.raw(sql_statements, post_id)
        return comments

    @get('comments/{comment_id:int}')
    async def get_comment_by_id(self, request:Request[User, Any, Any], comment_id:int) -> dict[str, Any]:
        user_id = request.user.get('id')
        # sql_statement = '''
        # WITH vote_status AS (
        #     SELECT * FROM comment_votes WHERE comment = {} AND voter = {}
        # )
        # SELECT c.id, c.content_json, c.content_html, c.score,
        # u.id AS author_id, u.username AS author_name,
        # CASE
        #     WHEN (SELECT value FROM vote_status) = 1 THEN 'upvoted'
        #     WHEN (SELECT value FROM vote_status) = -1 THEN 'downvoted'
        #     ELSE 'not_voted'
        # END AS vote_status
        # FROM comments c
        # LEFT JOIN users u ON c.author = u.id
        # LEFT JOIN vote_status vs ON c.id = vs.comment
        # WHERE c.id = {};
        # '''
        sql_statement = '''
        SELECT c.id, c.content_json, c.content_html, c.score, c.parent, c.depth,
        u.id AS author_id, u.username AS author_name,
        CASE
            WHEN cv.value = 1 THEN 'upvoted'
            WHEN cv.value = -1 THEN 'downvoted'
            ELSE 'not_voted'
        END AS vote_status,
        (SELECT json_agg(child_comments) FROM (
            SELECT c2.id, c2.content_json, c2.content_html, c2.score, c2.parent, c2.depth,
            u2.id AS author_id, u2.username AS author_name,
            CASE
                WHEN cv2.value = 1 THEN 'upvoted'
                WHEN cv2.value = -1 THEN 'downvoted'
                ELSE 'not_voted'
            END AS vote_status
            FROM comments c2
            LEFT JOIN users u2 ON c2.author = u2.id
            LEFT JOIN comment_votes cv2 ON c2.id = cv2.comment AND cv2.voter = {}
            WHERE c2.parent = c.id
        ) AS child_comments) AS children
        FROM comments c
        LEFT JOIN users u ON c.author = u.id
        LEFT JOIN comment_votes cv ON c.id = cv.comment AND cv.voter = {}
        WHERE c.id = {};
        '''
        comment = await Comment.raw(sql_statement, comment_id, user_id, comment_id)
        print(comment)
        return comment[0] if comment else {}
    

class CommentVoteController(Controller):
    path = '/comments'

    @post('/{comment_id:int}/vote')
    async def vote_comment(self, data:CommentVoteSchema, request:Request[User, Any, Any], comment_id:int)->dict[str, Any]:
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
                        WHEN (SELECT old_value FROM action) IS NULL THEN (SELECT new_value::int FROM action)
                        ELSE (SELECT new_value::int FROM action) - (SELECT old_value::int FROM action)
                    END
                WHEN EXISTS (SELECT 1 FROM deletion) THEN -(SELECT deleted_value::int FROM deletion)
                ELSE 0
            END
            WHERE id = {}
            RETURNING id AS comment_id, score AS new_score, (SELECT vote_status FROM status_check) AS status;
        '''
        response = await CommentVote.raw(sql_statement, comment_id, user_id, comment_id, user_id, data.value, comment_id, user_id, data.value, str(data.value), comment_id)
        return response[0] if response else {}
