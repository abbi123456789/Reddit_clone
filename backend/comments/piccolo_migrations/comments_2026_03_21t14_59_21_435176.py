from piccolo.apps.migrations.auto.migration_manager import MigrationManager
from piccolo.columns.column_types import Integer

ID = "2026-03-21T14:59:21:435176"
VERSION = "1.31.0"
DESCRIPTION = ""


async def forwards():
    manager = MigrationManager(
        migration_id=ID, app_name="comments", description=DESCRIPTION
    )

    manager.drop_column(
        table_class_name="Comment",
        tablename="comments",
        column_name="downvotes",
        db_column_name="downvotes",
        schema=None,
    )

    manager.drop_column(
        table_class_name="Comment",
        tablename="comments",
        column_name="upvotes",
        db_column_name="upvotes",
        schema=None,
    )

    manager.alter_column(
        table_class_name="Comment",
        tablename="comments",
        column_name="score",
        db_column_name="score",
        params={"default": 0},
        old_params={"default": 1},
        column_class=Integer,
        old_column_class=Integer,
        schema=None,
    )

    return manager
