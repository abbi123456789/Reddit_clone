from litestar import Controller, post, get, Request
from litestar.enums import RequestEncodingType
from litestar.params import Body
from litestar.datastructures import UploadFile
from litestar.exceptions import HTTPException
from typing import Any, List

from .tables import Community, CommunityFlair, JoinedCommunityMembers, CommunityModerators
from .schema import CommunitySchema, FlairSchema
from accounts.tables import User
from utils.s3 import upload_file_to_s3

class CommunityController(Controller):
    path = '/r'

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

    @get('/my-communities')
    async def get_my_communities(self, request:Request[User, Any, Any])->list:
        communities = await Community.select(Community.id, Community.name).where(Community.creator == request.user.get('id'))
        return communities

    @get('/{community_name:str}')
    async def get_community(self, request:Request[Any, Any, Any])->None:
        sql_statement = '''
        SELECT c.id, c.name, c.description, c.visibility, c.nsfw, c.category, c.creator,
        f.id as flair_id, f.title as flair_title, f.background_color, f.text_color, f.mod_only, f.hue, f.saturation
        FROM communities c
        LEFT JOIN community_flairs f ON c.id = f.community
        WHERE c.name = {}
        '''
        community_name = request.path_params['community_name']
        async with Community._meta.db.transaction():
            community = await Community.raw(sql_statement, community_name)
        if not community:
            raise HTTPException(detail="Community not found", status_code=404)
        community_dict = {
            'id': community[0].get('id'),
            'name': community[0].get('name'),
            'description': community[0].get('description'),
            'visibility': community[0].get('visibility'),
            'nsfw': community[0].get('nsfw'),
            'category': community[0].get('category'),
            'creator': community[0].get('creator'),
            'flairs': []
        }
        for comm in community:
            if comm.get('flair_id'):
                flair_dict = {
                    'id': comm.get('flair_id'),
                    'title': comm.get('flair_title'),
                    'background_color': comm.get('background_color'),
                    'text_color': comm.get('text_color'),
                    'mod_only': comm.get('mod_only'),
                    'hue': comm.get('hue'),
                    'saturation': comm.get('saturation')
                }
                community_dict['flairs'].append(flair_dict)
        return community_dict

    @post('/{community_name:str}/create/flair')
    async def create_flair(self, request:Request[User, Any, Any], data: FlairSchema)->None:
        community_name = request.path_params['community_name']
        community = await Community.objects().get(Community.name == community_name)
        if not community:
            raise HTTPException(detail="Community not found", status_code=404)
        if community.creator != request.user.get('id'):
            raise HTTPException(detail="Only the community creator can create flairs", status_code=403)
        try:
            flair = CommunityFlair(
                title=data.title,
                background_color=data.background_color,
                text_color=data.text_color,
                mod_only=data.mod_only,
                hue=data.hue,
                saturation=data.saturation,
                community=community.id
            )
            await flair.save()
            return flair.to_dict()
        except Exception as e:
            raise HTTPException(detail=str(e), status_code=500)

    @get('/{community_name:str}/flairs')
    async def get_flairs(self, request:Request[User, Any, Any])->list:
        community_name = request.path_params['community_name']
        community = await Community.objects().get(Community.name == community_name)
        if not community:
            raise HTTPException(detail="Community not found", status_code=404)
        flairs = await CommunityFlair.select(CommunityFlair.id, CommunityFlair.title, CommunityFlair.background_color, CommunityFlair.text_color).where(CommunityFlair.community == community.id)
        return flairs

    @post('/upload/image')
    async def upload_image(self, request: Request[User, Any, Any], data: UploadFile = Body(media_type=RequestEncodingType.MULTI_PART)) -> dict[str, str]:
        try:
            content = await data.read()
            url = upload_file_to_s3(content, data.filename, data.content_type)
            return {"url": url}
        except Exception as e:
            print(e)
            raise HTTPException(detail=str(e), status_code=500)
        
    @get('/{community_name:str}/join/status')
    async def user_join_status(self, request:Request[User, Any, Any]) -> bool:
        user_id = request.user.get('id')
        community_name = request.path_params['community_name']
        query_result = await Community.select('id').where(Community.name == community_name)
        if query_result:
            community = query_result[0]
            community_id = community.get('id')
        sql_statement = '''
        SELECT EXISTS (
            SELECT 1 FROM joined_members
            WHERE user_id = {} AND community_id = {}
        ) AS is_member;
        '''
        results = await Community.raw(sql_statement, user_id, community_id)
        results = results[0]
        return results.get('is_member')

    @get('/{community_name:str}/posts')
    async def get_community_posts(self, request:Request[User, Any, Any])->List[dict[str, Any]]:
        community_name = request.path_params['community_name']
        query_result = await Community.select('id').where(Community.name == community_name)
        if query_result:
            community = query_result[0]
            community_id = community.get('id')
        if request.user:
            user_id = request.user.get('id')
            sql_statement = '''
            SELECT p.id, p.title, p.slug, p.content_html, p.content_json, p.updated_at, p.score, p.comment_count, p.score,
            u.username AS author_name, u.id AS author_id,
            c.name AS community_name, c.id AS community_id,
            f.title AS flair_title, f.id AS flair_id, f.background_color AS flair_color, f.text_color AS flair_text_color,
            CASE (SELECT value FROM post_votes WHERE post=p.id AND voter={})
                WHEN 1 THEN 'upvoted'
                WHEN -1 THEN 'downvoted'
                ELSE 'not_voted'
            END AS vote_status
            FROM communities c
            LEFT JOIN post p ON p.community = c.id
            LEFT JOIN users u ON p.author = u.id
            LEFT JOIN community_flairs f ON p.flair = f.id
            WHERE c.id = {};
            '''
            results = await Community.raw(sql_statement, user_id, community_id)
        else:
            sql_statement = '''
            SELECT p.id, p.title, p.slug, p.content_html, p.content_json, p.updated_at, p.score, p.comment_count, p.score,
            u.username AS author_name, u.id AS author_id,
            c.name AS community_name, c.id AS community_id,
            f.title AS flair_title, f.id AS flair_id, f.background_color AS flair_color, f.text_color AS flair_text_color
            FROM communities c
            LEFT JOIN post p ON p.community = c.id
            LEFT JOIN users u ON p.author = u.id
            LEFT JOIN community_flairs f ON p.flair = f.id
            WHERE c.id = {};
            '''
            results = await Community.raw(sql_statement, community_id)
        return results