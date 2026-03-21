from litestar import Controller, get, post, Request
from typing import Any

from accounts.tables import User
from community.tables import Community, CommunityFlair
from .tables import Post, PostVote
from .schema import PostCreate, VoteSchema
from utils.slugify import create_timestamped_slug

class PostController(Controller):
    path = '/posts'

    @post('/create')
    async def create_post(self, request:Request[User, Any, Any] ,data: PostCreate)->dict[str, Any]:
        user_id = request.user.get('id')
        community_id = await Community.select(Community.id).where(Community.name == data.community_name).first()
        community_id = community_id.get('id') if community_id else None
        if data.flair:
            flair_id = await CommunityFlair.select(CommunityFlair.id).where(CommunityFlair.title == data.flair, CommunityFlair.community == community_id).first()
            flair_id = flair_id.get('id') if flair_id else None
        else:
            flair_id = None
        slug = create_timestamped_slug(data.title)
        post = Post(
            title=data.title,
            slug=slug,
            content_html=data.content_html,
            content_json=data.content_json,
            community=community_id,
            author=user_id,
            flair=flair_id,
            is_nsfw=data.is_nsfw,
            is_spoiler=data.is_spoiler
        )
        await post.save()
        print(post)
        return post.to_dict()
    
    @get('/{post_slug:str}')
    async def get_post(self, post_slug: str)->dict[str, Any]:
        sql_statement = '''
        SELECT 
            p.id, p.title, p.slug, p.content_html, p.content_json, p.updated_at, p.score, p.comment_count,
            u.username AS author_username, u.id AS author_id,
            c.name AS community_name, c.id AS community_id,
            f.title AS flair_title, f.id AS flair_id, f.background_color AS flair_color, f.text_color AS flair_text_color
        FROM post p
        LEFT JOIN users u ON p.author = u.id
        LEFT JOIN communities c ON p.community = c.id
        LEFT JOIN community_flairs f ON p.flair = f.id
        WHERE p.slug = {}
        '''
        async with Post._meta.db.transaction():
            post = await Post.raw(sql_statement, post_slug)
            print(post)
        return post[0] if post else {}
    
    # @post('/{post_id:int}/vote')
    # async def upvote_post(self, data:VoteSchema, request:Request[User, Any, Any], post_id: int)->None:
    #     user_id = request.user.get('id')
    #     record_exists = await PostVote.exists().where((User.id == user_id) & (Post.id == post_id))
    #     post = await Post.objects().where(Post.id == post_id).first()
    #     async with PostVote._meta.db.transaction():
    #         if not record_exists:
    #             post_vote = PostVote(post=post_id, user=user_id, value=data.value)
    #             await post_vote.save()
    #             await post.update_self({Post.score : Post.score + data.value})
    #         else:
    #             post_vote = await PostVote.objects().where((User.id == user_id) & (Post.id == post_id)).first()
    #             if post_vote.value == data.value:
    #                 await post_vote.remove()
    #                 await post.update_self({Post.score : Post.score - data.value})
    #             else:
    #                 post_vote.update_self({PostVote.value : data.value})
    #                 if data.value == 1:
    #                     await post.update_self({Post.score : Post.score + 2})
    #                 else:
    #                     await post.update_self({Post.score : Post.score - 2})

                
                
    @post('/post_id:int/vote')
    async def vote_post(self, data:VoteSchema, request:Request[User, Any, Any], post_id:int)->None:
        user_id = request.user.get('id')
        sql_query = '''
        WITH existing AS (
            SELECT value FROM post_votes WHERE post = {} AND voter = {}
        ),
        action AS (
            INSERT INTO post_votes (post, voter, value)
            VALUES ({}, {}, {})
            ON CONFLICT (post, voter)
            DO UPDATE SET value = EXCLUDED.value
            WHERE post_votes.value != EXCLUDED.value
            RETURNING (SELECT value FROM existing) AS old_value,
            value AS new_value, 'voted' AS state
        ),
        deletion AS (
            DELETE FROM post_votes
            WHERE post = {} AND voter = {} AND value = {}
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
        ),
        UPDATE post
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
        RETURNING id AS post_id, score AS new_score, (SELECT vote_status FROM status_check) AS status;
        '''
        await PostVote.raw(sql_query, post_id, user_id, post_id, user_id, data.value, post_id, user_id, data.value, data.value, post_id)

    
    @post('/{post_id:int}/edit')
    async def edit_post(self, post_id: int)->None:
        raise NotImplementedError("This endpoint will handle editing a post")
    
    @post('/{post_id:int}/delete')
    async def delete_post(self, post_id: int)->None: 
        raise NotImplementedError("This endpoint will handle deleting a post")
    
    @post('/{post_id:int}/pin')
    async def pin_post(self, post_id: int)->None:
        raise NotImplementedError("This endpoint will handle pinning a post")
    
    @post('/{post_id:int}/lock')
    async def lock_post(self, post_id: int)->None:
        raise NotImplementedError("This endpoint will handle locking a post")