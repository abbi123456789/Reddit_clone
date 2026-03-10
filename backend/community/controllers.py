from litestar import Controller, post, get, Request
from litestar.enums import RequestEncodingType
from litestar.params import Body
from litestar.datastructures import UploadFile
from litestar.exceptions import HTTPException
from typing import Any

from .tables import Community, JoinedCommunityMembers, CommunityModerators
from .schema import CommunitySchema
from accounts.tables import User
from utils.s3 import upload_file_to_s3

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
            
    @get('/{community_id:int}')
    async def get_community(self)->None:
        return None

    @post('/upload/image')
    async def upload_image(self, request: Request[User, Any, Any], data: UploadFile = Body(media_type=RequestEncodingType.MULTI_PART)) -> dict[str, str]:
        try:
            content = await data.read()
            url = upload_file_to_s3(content, data.filename, data.content_type)
            return {"url": url}
        except Exception as e:
            print(e)
            raise HTTPException(detail=str(e), status_code=500)