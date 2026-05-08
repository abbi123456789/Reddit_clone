from piccolo.apps.migrations.auto.migration_manager import MigrationManager
from piccolo.columns.column_types import JSONB
from piccolo.columns.column_types import Text
from piccolo.columns.column_types import Varchar
from piccolo.columns.indexes import IndexMethod

ID = "2026-05-08T13:42:42:770269"
VERSION = "1.31.0"
DESCRIPTION = ""


async def forwards():
    manager = MigrationManager(
        migration_id=ID, app_name="posts", description=DESCRIPTION
    )

    manager.add_column(
        table_class_name="Post",
        tablename="post",
        column_name="post_type",
        db_column_name="post_type",
        column_class_name="Varchar",
        column_class=Varchar,
        params={
            "length": 20,
            "default": "text",
            "null": False,
            "primary_key": False,
            "unique": False,
            "index": False,
            "index_method": IndexMethod.btree,
            "choices": None,
            "db_column_name": None,
            "secret": False,
        },
        schema=None,
    )

    manager.alter_column(
        table_class_name="Post",
        tablename="post",
        column_name="content_json",
        db_column_name="content_json",
        params={"null": True},
        old_params={"null": False},
        column_class=JSONB,
        old_column_class=JSONB,
        schema=None,
    )

    manager.alter_column(
        table_class_name="Post",
        tablename="post",
        column_name="content_html",
        db_column_name="content_html",
        params={"null": True},
        old_params={"null": False},
        column_class=Text,
        old_column_class=Text,
        schema=None,
    )

    return manager
