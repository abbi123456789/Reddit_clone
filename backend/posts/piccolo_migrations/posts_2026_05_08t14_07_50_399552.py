from piccolo.apps.migrations.auto.migration_manager import MigrationManager
from piccolo.columns.column_types import JSONB
from piccolo.columns.column_types import Varchar
from piccolo.columns.indexes import IndexMethod

ID = "2026-05-08T14:07:50:399552"
VERSION = "1.31.0"
DESCRIPTION = ""


async def forwards():
    manager = MigrationManager(
        migration_id=ID, app_name="posts", description=DESCRIPTION
    )

    manager.add_column(
        table_class_name="Post",
        tablename="post",
        column_name="link_url",
        db_column_name="link_url",
        column_class_name="Varchar",
        column_class=Varchar,
        params={
            "length": 1000,
            "default": "",
            "null": True,
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

    manager.add_column(
        table_class_name="Post",
        tablename="post",
        column_name="media_urls",
        db_column_name="media_urls",
        column_class_name="JSONB",
        column_class=JSONB,
        params={
            "default": "{}",
            "null": True,
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

    return manager
