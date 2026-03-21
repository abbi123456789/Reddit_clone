from piccolo.apps.migrations.auto.migration_manager import MigrationManager

ID = "2026-03-21T15:33:58:187942"
VERSION = "1.31.0"
DESCRIPTION = ""


async def forwards():
    manager = MigrationManager(
        migration_id=ID, app_name="comments", description=DESCRIPTION
    )

    manager.rename_column(
        table_class_name="CommentVote",
        tablename="comment_votes",
        old_column_name="user",
        new_column_name="voter",
        old_db_column_name="user",
        new_db_column_name="voter",
        schema=None,
    )

    return manager
