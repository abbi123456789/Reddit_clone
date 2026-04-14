from litestar import Controller, get, post, Request
from typing import Any

from .tables import User

class ProfileController(Controller):
    path = '/profile'

    @get('/posts')
    async def getUserPosts(self, request:Request[User, Any, Any])->list[dict[str, Any]]:
        user_id = request.user.get('id')
        sql_statements = '''
        SELECT p.id, p.title, p.slug, LEFT(p.content_html, 200), p.score,
        c.name as community_name, c.id as community_id, 
        CASE
            WHEN pv.value = 1 THEN 'upvoted'
            WHEN pv.value = -1 THEN 'downvoted'
            ELSE 'not_voted'
        END AS vote_status
        FROM post p
        INNER JOIN communities c ON p.community = c.id
        LEFT JOIN post_votes pv ON p.id = pv.post AND pv.voter = {}
        WHERE p.author = {};
        '''
        async with User._meta.db.transaction():
            posts = await User.raw(sql_statements, user_id, user_id)
        return posts

    @get('/comments')
    async def getUserComments(self, request:Request[User, Any, Any])->list[dict[str, Any]]:
        user_id = request.user.get('id')
        sql_statement = '''
        SELECT c.id, LEFT(c.content_html, 200), c.score,
        communities.name as community_name, communities.id as community_id,
        CASE
            WHEN cv.value = 1 THEN 'upvoted'
            WHEN cv.value = -1 THEN 'downvoted'
            ELSE 'not_voted'
        END AS vote_status
        FROM comments c
        INNER JOIN communities ON c.community = communities.id
        LEFT JOIN comment_votes cv ON c.id = cv.comment AND cv.voter = {}
        WHERE c.author = {};
        '''
        async with User._meta.db.transaction():
            comments = await User.raw(sql_statement, user_id, user_id)
        return comments

    @get('/upvoted-posts')
    async def getUserUpvotedPosts(self, request:Request[User, Any, Any])->list[dict[str, Any]]:
        user_id = request.user.get('id')
        sql_statement = '''
        SELECT p.id, p.title, LEFT(p.content_html, 200), p.score,
        c.name AS community_name, c.id AS community_id,
        'upvoted' AS vote_status
        FROM post_votes pv
        INNER JOIN post p ON pv.post = p.id
        INNER JOIN communities c ON p.community = c.id
        WHERE pv.voter = {} AND pv.value = {};
        '''
        async with User._meta.db.transaction():
            liked_posts = await User.raw(sql_statement, user_id, 1)
        return liked_posts
    
    @get('/downvoted-posts')
    async def getUserDownvotedPosts(self, request:Request[User, Any, Any])->list[dict[str, Any]]:
        user_id = request.user.get('id')
        sql_statement = '''
        SELECT p.id, p.title, LEFT(p.content_html, 200), p.score,
        c.name AS community_name, c.id AS community_id,
        FROM post_votes pv
        INNER JOIN post p ON pv.post = p.id
        INNER JOIN communities c ON p.community = c.id
        WHERE pv.voter = {} AND pv.value = {}
        '''
        async with User._meta.db.transaction():
            disliked_posts = await User.raw(sql_statement, user_id, -1)
        return disliked_posts
    
    @get('/upvoted-comments')
    async def getUserUpvotedComments(self, request:Request[User, Any, Any])->list[dict[str, Any]]:
        user_id = request.user.get('id')
        sql_statement = '''
        SELECT c.id, LEFT(c.content_html, 200), c.score,
        communities.name AS community_name, communities.id AS community_id
        FROM comment_votes cv
        INNER JOIN comments c ON cv.comment = c.id
        INNER JOIN communities ON c.community = communities.id
        WHERE cv.voter = {} AND cv.value = {};
        '''
        async with User._meta.db.transaction():
            liked_comments = await User.raw(sql_statement, user_id, 1)
        return liked_comments
    
    @get('/downvoted-comments')
    async def getUserDownvotedComments(self, request:Request[User, Any, Any])->list[dict[str, Any]]:
        user_id = request.user.get('id')
        sql_statement = '''
        SELECT c.id, LEFT(c.content_html, 200), c.score,
        communities.name AS community_name, communities.id AS community_id
        FROM comment_votes cv
        INNER  JOIN comments c ON cv.comment = c.id
        INNER JOIN communities ON c.community = communities.id
        WHERE cv.voter = {} AND cv.value = {};
        '''
        async with User._meta.db.transaction():
            disliked_comments = await User.raw(sql_statement, user_id, -1)
        return disliked_comments