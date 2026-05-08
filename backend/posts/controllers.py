import json

from litestar import Controller, get, post, Request
from litestar.exceptions import HTTPException
from typing import Any

from accounts.tables import User
from community.tables import Community, CommunityFlair
from .tables import Post, PostVote
from .schema import PostCreate, PostUpdate, VoteSchema
from utils.slugify import create_timestamped_slug

class PostController(Controller):
    path = '/posts'

    @post("/create")
    async def create_post(
        self,
        request: Request[User, Any, Any],
        data: PostCreate,
    ) -> dict[str, Any]:
        user_id = request.user.get("id")

        community = await Community.select(Community.id).where(
            Community.name == data.community_name
        ).first()

        community_id = community.get("id") if community else None

        if community_id is None:
            raise HTTPException(status_code=404, detail="Community not found")

        if data.flair:
            flair = await CommunityFlair.select(CommunityFlair.id).where(
                CommunityFlair.title == data.flair,
                CommunityFlair.community == community_id,
            ).first()

            flair_id = flair.get("id") if flair else None
        else:
            flair_id = None

        if data.post_type not in ["text", "media", "link"]:
            raise HTTPException(status_code=400, detail="Invalid post type")

        content_html = None
        content_json = None
        media_urls = None
        link_url = None

        if data.post_type == "text":
            content_html = data.content_html
            content_json = data.content_json

        elif data.post_type == "media":
            media_urls = data.media_urls or []

            if len(media_urls) == 0:
                raise HTTPException(
                    status_code=400,
                    detail="Media post must contain at least one image or video",
                )

        elif data.post_type == "link":
            link_url = data.link_url

            if not link_url:
                raise HTTPException(
                    status_code=400,
                    detail="Link post must contain a URL",
                )

        slug = create_timestamped_slug(data.title)

        post = Post(
            title=data.title,
            slug=slug,

            post_type=data.post_type,

            content_html=content_html,
            content_json=content_json,

            media_urls=media_urls,
            link_url=link_url,

            community=community_id,
            author=user_id,
            flair=flair_id,

            is_nsfw=data.is_nsfw,
            is_spoiler=data.is_spoiler,
        )

        await post.save()

        return post.to_dict()

    @get('/{post_id:int}/{post_slug:str}')
    async def get_post(self, request:Request[User, Any, Any], post_id:int)->dict[str, Any]:
        if request.user:
            user_id = request.user.get('id')
            sql_statement = '''
            SELECT 
                p.id, p.title, p.slug, p.content_html, p.content_json, p.updated_at, p.score, p.comment_count, p.score,
                p.post_type, p.media_urls, p.link_url,
                u.username AS author_username, u.id AS author_id,
                c.name AS community_name, c.id AS community_id,
                f.title AS flair_title, f.id AS flair_id, f.background_color AS flair_color, f.text_color AS flair_text_color,
                CASE (SELECT value FROM post_votes WHERE post = {} AND voter = {})
                    WHEN 1 THEN 'upvoted'
                    WHEN -1 THEN 'downvoted'
                    ELSE 'not_voted'
                END AS vote_status 
            FROM post p
            LEFT JOIN users u ON p.author = u.id
            LEFT JOIN communities c ON p.community = c.id
            LEFT JOIN community_flairs f ON p.flair = f.id
            WHERE p.id = {};
            '''
            post = await Post.raw(sql_statement, post_id, user_id, post_id)
        else:
            sql_statement = '''
            SELECT 
                p.id, p.title, p.slug, p.content_html, p.content_json, p.updated_at, p.score, p.comment_count, p.score,
                p.post_type, p.media_urls, p.link_url,
                u.username AS author_username, u.id AS author_id,
                c.name AS community_name, c.id AS community_id,
                f.title AS flair_title, f.id AS flair_id, f.background_color AS flair_color, f.text_color AS flair_text_color
            FROM post p
            LEFT JOIN users u ON p.author = u.id
            LEFT JOIN communities c ON p.community = c.id
            LEFT JOIN community_flairs f ON p.flair = f.id
            WHERE p.id = {};
            '''
            post = await Post.raw(sql_statement, post_id)
        return post[0] if post else {}            
                
    @post('/{post_id:int}/vote')
    async def vote_post(self, data:VoteSchema, request:Request[User, Any, Any], post_id:int)->dict[str, Any]:
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
        )
        UPDATE post
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
        RETURNING id AS post_id, score AS new_score, (SELECT vote_status FROM status_check) AS status;
        '''
        response = await PostVote.raw(sql_query, post_id, user_id, post_id, user_id, data.value, post_id, user_id, data.value, str(data.value), post_id)
        return response[0] if response else {}

    
    @post('/{post_id:int}/edit')
    async def edit_post(self, request:Request[User, Any, Any], data: PostUpdate, post_id: int)->dict[str, Any]:
        user_id = request.user.get('id')
        existing_post = await Post.select(Post.id, Post.author, Post.slug, Post.title).where(Post.id == post_id).first()

        if not existing_post:
            raise HTTPException(detail="Post not found", status_code=404)

        if existing_post.get('author') != user_id:
            raise HTTPException(detail="Only the post owner can edit this post", status_code=403)

        community = await Community.select(Community.id).where(Community.name == data.community_name).first()
        if not community:
            raise HTTPException(detail="Community not found", status_code=404)

        community_id = community.get('id')

        if data.flair:
            flair = await CommunityFlair.select(CommunityFlair.id).where(
                CommunityFlair.title == data.flair,
                CommunityFlair.community == community_id,
            ).first()
            flair_id = flair.get('id') if flair else None
        else:
            flair_id = None

        slug = existing_post.get('slug')
        if existing_post.get('title') != data.title:
            slug = create_timestamped_slug(data.title)

        sql_statement = '''
        UPDATE post
        SET title = {}, slug = {}, content_html = {}, content_json = {}::jsonb, community = {}, flair = {}, is_nsfw = {}, is_spoiler = {}
        WHERE id = {}
        RETURNING id, title, slug, content_html, content_json, community, flair, is_nsfw, is_spoiler;
        '''
        updated_post = await Post.raw(
            sql_statement,
            data.title,
            slug,
            data.content_html,
            json.dumps(data.content_json),
            community_id,
            flair_id,
            data.is_nsfw,
            data.is_spoiler,
            post_id,
        )
        return updated_post[0] if updated_post else {}
    
    @post('/{post_id:int}/delete')
    async def delete_post(self, post_id: int)->None: 
        raise NotImplementedError("This endpoint will handle deleting a post")
    
    @post('/{post_id:int}/pin')
    async def pin_post(self, post_id: int)->None:
        raise NotImplementedError("This endpoint will handle pinning a post")
    
    @post('/{post_id:int}/lock')
    async def lock_post(self, post_id: int)->None:
        raise NotImplementedError("This endpoint will handle locking a post")
