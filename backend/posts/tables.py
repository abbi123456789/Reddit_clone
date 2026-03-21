from piccolo.table import Table
from piccolo.columns import Varchar, JSONB, Timestamptz, ForeignKey, Text

from community.tables import Community, CommunityFlair
from accounts.tables import User

from piccolo.columns import Varchar, Text, ForeignKey, Timestamptz, Boolean, JSONB, Integer,\
LazyTableReference
from piccolo.columns.m2m import M2M

class Post(Table):
    title = Varchar(length=300)
    slug = Varchar(length=300, unique=True, index=True)
    
    # Lexical Content
    content_json = JSONB() # The "Source of Truth" for editing
    content_html = Text() # The "Read-only" version for fast rendering/SEO
    
    # Relations
    community = ForeignKey(Community)
    author = ForeignKey(User)
    flair = ForeignKey(CommunityFlair, null=True)
    
    # Engagement & Ranking
    score = Integer(default=0)
    comment_count = Integer(default=0) # Denormalized for performance
    
    # Moderation & Flags
    is_nsfw = Boolean(default=False)
    is_spoiler = Boolean(default=False)
    is_pinned = Boolean(default=False) # For "Stickied" posts
    is_locked = Boolean(default=False) # Prevents new comments
    is_deleted = Boolean(default=False) # Soft delete
    
    # Timestamps
    created_at = Timestamptz(auto_now_add=True)
    updated_at = Timestamptz(auto_update=True)
    
    voted_users = M2M(LazyTableReference('PostVote', module_path=__name__))

class PostVote(Table, tablename='post_votes'):
    post = ForeignKey(Post)
    user = ForeignKey(User)
    value = Integer()