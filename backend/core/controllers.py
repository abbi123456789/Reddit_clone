from litestar import Controller, get, Request
from typing import Any, List

from accounts.tables import User

class HomeController(Controller):

    @get('/posts/feed')
    async def posts_feed(self, request:Request[User, Any, Any])->List[dict[str, Any]]:
        if request.user:
            user_id = request.user.get('id')
            sql_statement = '''
            SELECT p.id, p.title, p.slug, p.content_html, p.content_json, p.updated_at, p.score, p.comment_count,
            u.username AS author_name, u.id AS author_id,
            c.name AS community_name, c.id AS community_id,
            f.title AS flair_title, f.id AS flair_id, f.background_color AS flair_color, f.text_color AS flair_text_color,
            CASE (SELECT value FROM post_votes WHERE post=p.id AND voter = {})
                WHEN 1 THEN 'upvoted'
                WHEN -1 THEN 'downvoted'
                ELSE 'not_voted'
            END AS vote_status
            FROM post p
            LEFT JOIN communities c ON p.community = c.id
            LEFT JOIN users u ON p.author = u.id
            LEFT JOIN community_flairs f ON p.flair = f.id;
            '''
            results = await User.raw(sql_statement, user_id)
        else:
            sql_statement = '''
            SELECT p.id, p.title, p.slug, p.content_html, p.content_json, p.updated_at, p.score, p.comment_count,
            u.username AS author_name, u.id AS author_id,
            c.name AS community_name, c.id AS community_id,
            f.title AS flair_title, f.id AS flair_id, f.background_color AS flair_color, f.text_color AS flair_text_color
            FROM post p
            LEFT JOIN communities c ON p.community = c.id
            LEFT JOIN users u ON p.author = u.id
            LEFT JOIN community_flairs f ON p.flair = f.id
            '''
            results = await User.raw(sql_statement)
        return results
