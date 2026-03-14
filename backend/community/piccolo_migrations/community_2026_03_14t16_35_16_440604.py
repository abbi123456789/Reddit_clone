from piccolo.apps.migrations.auto.migration_manager import MigrationManager

ID = "2026-03-14T16:35:16:440604"
VERSION = "1.31.0"
DESCRIPTION = ""


async def forwards():
    manager = MigrationManager(
        migration_id=ID, app_name="community", description=DESCRIPTION
    )

    manager.rename_column(
        table_class_name="CommunityFlair",
        tablename="community_flairs",
        old_column_name="color",
        new_column_name="background_color",
        old_db_column_name="color",
        new_db_column_name="background_color",
        schema=None,
    )

    return manager
