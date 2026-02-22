from piccolo.table import Table
from piccolo.columns import Varchar, Text, ForeignKey, Timestamptz, Boolean, Array, Integer, LazyTableReference, M2M

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
    flair = Array(base_column=Varchar(length=30, unique=True))
    icon_url = Varchar(length=500, null=True)
    banner_url = Varchar(length=500, null=True)
    creator = ForeignKey(User)

    banned_members = M2M(LazyTableReference('BannedCommunityMembers', module_path=__name__))
    joined_members = M2M(LazyTableReference('JoinedCommunityMembers', module_path=__name__))
    moderated_members = M2M(LazyTableReference('CommunityModerators', module_path=__name__))

class CommunityRules(Table, tablename='rules'):
    title = Varchar(length=200)
    description = Text()
    created_at = Timestamptz()
    community = ForeignKey(references=Community)

class BannedCommunityMembers(Table, tablename='banned_community_members'):
    community = ForeignKey(Community)
    user = ForeignKey(User)
    reason = Varchar(length=200)
    banned_on = Timestamptz()

class JoinedCommunityMembers(Table, tablename='joined_members'):
    community = ForeignKey(Community)
    user = ForeignKey(User)
    joined_on = Timestamptz()

class CommunityModerators(Table, tablename='community_moderators'):
    community = ForeignKey(Community)
    user = ForeignKey(User)
    moderating_from = Timestamptz()