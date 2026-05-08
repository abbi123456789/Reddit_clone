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
    
    # Post type: text, media, link
    post_type = Varchar(length=20, default="text")
    # Lexical Content
    content_json = JSONB(null=True) # The "Source of Truth" for editing
    content_html = Text(null=True) # The "Read-only" version for fast rendering/SEO
    
    # Relations
    community = ForeignKey(Community)
    author = ForeignKey(User)
    flair = ForeignKey(CommunityFlair, null=True)
    
    # Engagement & Ranking
    score = Integer(default=0)
    comment_count = Integer(default=0) # Denormalized for performance

    media_urls = JSONB(null=True)
    # Link post
    link_url = Varchar(length=1000, null=True)
    
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
    voter = ForeignKey(User)
    value = Integer()