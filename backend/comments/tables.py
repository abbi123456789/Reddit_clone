from piccolo.table import Table
from piccolo.columns import JSONB, Text, Timestamptz, Integer, ForeignKey, Boolean, \
LazyTableReference
from piccolo.columns.m2m import M2M

from posts.tables import Post
from community.tables import Community
from accounts.tables import User

class Comment(Table, tablename='comments'):
    content_json = JSONB()
    content_html = Text()

    author = ForeignKey(User)
    post = ForeignKey(Post)
    community = ForeignKey(Community)

    score = Integer(default=0)

    parent = ForeignKey('self')
    depth = Integer(default=0)

    is_deleted = Boolean(default=False)
    is_removed = Boolean(default=False) #mods removed it.

    created_at = Timestamptz()
    updated_at = Timestamptz(auto_update=True)

    voted_users = M2M(LazyTableReference('CommentVote', module_path=__name__))


class CommentVote(Table, tablename='comment_votes'):
    comment = ForeignKey(Comment)
    user = ForeignKey(User)
    value = Integer()