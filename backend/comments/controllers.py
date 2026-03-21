from litestar import Controller, get, post, Request
from typing import Any

from .tables import Comment
from .schema import CommentSchema
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