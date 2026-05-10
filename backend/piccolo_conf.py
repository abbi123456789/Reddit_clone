from piccolo.conf.apps import AppRegistry
from piccolo.engine.postgres import PostgresEngine
from settings import (
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_HOST,
    DATABASE_PORT,
)
DB = PostgresEngine(
    config={
        "database" : DATABASE_NAME,
        "user": DATABASE_USER,
        "password": DATABASE_PASSWORD,
        "host": DATABASE_HOST,
        "port": DATABASE_PORT,
    }
)
APP_REGISTRY = AppRegistry(
    apps=[
        "accounts.piccolo_app",
        "community.piccolo_app",
        "posts.piccolo_app",
        "comments.piccolo_app",
    ]
)
