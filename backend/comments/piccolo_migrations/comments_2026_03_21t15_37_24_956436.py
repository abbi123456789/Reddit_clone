from piccolo.apps.migrations.auto.migration_manager import MigrationManager
from comments.tables import CommentVote

ID = "2026-03-21T15:37:24:956436"
VERSION = "1.31.0"
DESCRIPTION = ""


async def forwards():
    manager = MigrationManager(
        migration_id=ID, app_name="", description=DESCRIPTION
    )

    async def run():
        query = 'CREATE UNIQUE INDEX unique_voter_comment ON comment_votes(comment, voter);'
        await CommentVote.raw(query)
        print(f"running {ID}")

    manager.add_raw(run)

    return manager
