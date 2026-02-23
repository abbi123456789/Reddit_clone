from piccolo.table import Table
from piccolo.columns import Varchar, Text, ForeignKey, Timestamptz, Boolean, LazyTableReference, M2M

from accounts.tables import User

from enum import Enum

class Visibility(Enum):
    public = 'public'
    private = 'private'
    restricted = 'restricted'


class Community(Table, tablename='communities'):
    name = Varchar(length=50, unique=True, index=True)
    description = Text()
    category = Varchar(length=100)
    is_active = Boolean(default=True)
    visibility = Varchar(choices=Visibility, default=Visibility.public.value)
    nsfw = Boolean(default=False)
    created_at = Timestamptz()
    icon_url = Varchar(length=500, null=True)
    banner_url = Varchar(length=500, null=True)
    creator = ForeignKey(User)

    banned_members = M2M(LazyTableReference('BannedCommunityMembers', module_path=__name__))
    joined_members = M2M(LazyTableReference('JoinedCommunityMembers', module_path=__name__))
    moderated_members = M2M(LazyTableReference('CommunityModerators', module_path=__name__))

class CommunityFlair(Table, tablename='community_flairs'):
    title = Varchar(length=100)
    community = ForeignKey(references=Community)
    color = Varchar(length=30)
    created_on = Timestamptz()

class CommunityRules(Table, tablename='rules'):
    title = Varchar(length=200)
    description = Text()
    created_at = Timestamptz()
    community = ForeignKey(references=Community)

class BannedCommunityMembers(Table, tablename='banned_community_members'):
    community_id = ForeignKey(Community)
    user_id = ForeignKey(User)
    reason = Varchar(length=200)
    banned_on = Timestamptz()

class JoinedCommunityMembers(Table, tablename='joined_members'):
    community_id = ForeignKey(Community)
    user_id = ForeignKey(User)
    joined_on = Timestamptz()

class CommunityModerators(Table, tablename='community_moderators'):
    community_id = ForeignKey(Community)
    user_id = ForeignKey(User)
    moderating_from = Timestamptz()