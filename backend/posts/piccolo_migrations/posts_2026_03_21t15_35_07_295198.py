from piccolo.apps.migrations.auto.migration_manager import MigrationManager
from posts.tables import PostVote

ID = "2026-03-21T15:35:07:295198"
VERSION = "1.31.0"
DESCRIPTION = ""


async def forwards():
    manager = MigrationManager(
        migration_id=ID, app_name="", description=DESCRIPTION
    )

    async def run():
        query = 'CREATE UNIQUE INDEX unique_voter_post ON post_votes(post, voter)'
        await PostVote.raw(query)
        print(f"running {ID}")

    manager.add_raw(run)

    return manager
