from piccolo.apps.migrations.auto.migration_manager import MigrationManager
from piccolo.columns.column_types import Boolean
from piccolo.columns.column_types import Integer
from piccolo.columns.indexes import IndexMethod

ID = "2026-03-14T13:16:39:707299"
VERSION = "1.31.0"
DESCRIPTION = ""


async def forwards():
    manager = MigrationManager(
        migration_id=ID, app_name="community", description=DESCRIPTION
    )

    manager.add_column(
        table_class_name="Community",
        tablename="communities",
        column_name="enable_post_flair",
        db_column_name="enable_post_flair",
        column_class_name="Boolean",
        column_class=Boolean,
        params={
            "default": False,
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

    manager.add_column(
        table_class_name="CommunityFlair",
        tablename="community_flairs",
        column_name="hue",
        db_column_name="hue",
        column_class_name="Integer",
        column_class=Integer,
        params={
            "default": 0,
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
        table_class_name="CommunityFlair",
        tablename="community_flairs",
        column_name="mod_only",
        db_column_name="mod_only",
        column_class_name="Boolean",
        column_class=Boolean,
        params={
            "default": False,
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

    manager.add_column(
        table_class_name="CommunityFlair",
        tablename="community_flairs",
        column_name="saturation",
        db_column_name="saturation",
        column_class_name="Integer",
        column_class=Integer,
        params={
            "default": 0,
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
