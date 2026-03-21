from litestar import Controller, get, post, Request
from typing import Any

from accounts.tables import User
from community.tables import Community, CommunityFlair
from .tables import Post
from .schema import PostCreate
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
    
    @post('/{post_id:int}/upvote')
    async def upvote_post(self, post_id: int)->None:
        raise NotImplementedError("This endpoint will handle upvoting a post")
    
    @post('/{post_id:int}/downvote')
    async def downvote_post(self, post_id: int)->None:
        raise NotImplementedError("This endpoint will handle downvoting a post")
    
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