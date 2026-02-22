from piccolo.conf.apps import AppRegistry
from piccolo.engine.postgres import PostgresEngine

DB = PostgresEngine(
    config={
        "database": "piccolo_dreaddit",
        "user": "postgres",
        "password": "postgres",
        "host": "localhost",
        "port": 5432,
    }
)
APP_REGISTRY = AppRegistry(
    apps=["accounts.piccolo_app", "community.piccolo_app"]
)
