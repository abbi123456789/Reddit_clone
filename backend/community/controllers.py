from litestar import Controller, post, Request
from litestar.exceptions import HTTPException
from typing import Any

from .tables import Community, JoinedCommunityMembers, CommunityModerators
from .schema import CommunitySchema
from accounts.tables import User

class CommunityController(Controller):
    path = '/community'

    @post('/create')
    async def create_community(self, request:Request[User, Any, Any], data:CommunitySchema)->dict:
        print(data)
        async with Community._meta.db.transaction():
            try:
                community = Community(
                    name = data.name,
                    description = data.description,
                    visibility = data.visibility,
                    nsfw = data.nsfw,
                    category = data.category,
                    creator = request.user.get('id')
                )
                await community.save()

                await JoinedCommunityMembers.insert(JoinedCommunityMembers(community_id=community.id, user_id=request.user.get('id')))
                await CommunityModerators.insert(CommunityModerators(community_id=community.id, user_id=request.user.get('id')))

                print(community.to_dict())
                return community.to_dict()
            except Exception as e:
                raise HTTPException(detail=str(e), status_code=500)
            