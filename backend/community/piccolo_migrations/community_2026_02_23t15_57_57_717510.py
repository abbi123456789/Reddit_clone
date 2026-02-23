from piccolo.apps.migrations.auto.migration_manager import MigrationManager

ID = "2026-02-23T15:57:57:717510"
VERSION = "1.31.0"
DESCRIPTION = ""


async def forwards():
    manager = MigrationManager(
        migration_id=ID, app_name="community", description=DESCRIPTION
    )

    manager.rename_column(
        table_class_name="BannedCommunityMembers",
        tablename="banned_community_members",
        old_column_name="community",
        new_column_name="community_id",
        old_db_column_name="community",
        new_db_column_name="community_id",
        schema=None,
    )

    manager.rename_column(
        table_class_name="BannedCommunityMembers",
        tablename="banned_community_members",
        old_column_name="user",
        new_column_name="user_id",
        old_db_column_name="user",
        new_db_column_name="user_id",
        schema=None,
    )

    manager.rename_column(
        table_class_name="CommunityModerators",
        tablename="community_moderators",
        old_column_name="community",
        new_column_name="community_id",
        old_db_column_name="community",
        new_db_column_name="community_id",
        schema=None,
    )

    manager.rename_column(
        table_class_name="CommunityModerators",
        tablename="community_moderators",
        old_column_name="user",
        new_column_name="user_id",
        old_db_column_name="user",
        new_db_column_name="user_id",
        schema=None,
    )

    manager.rename_column(
        table_class_name="JoinedCommunityMembers",
        tablename="joined_members",
        old_column_name="community",
        new_column_name="community_id",
        old_db_column_name="community",
        new_db_column_name="community_id",
        schema=None,
    )

    manager.rename_column(
        table_class_name="JoinedCommunityMembers",
        tablename="joined_members",
        old_column_name="user",
        new_column_name="user_id",
        old_db_column_name="user",
        new_db_column_name="user_id",
        schema=None,
    )

    return manager
