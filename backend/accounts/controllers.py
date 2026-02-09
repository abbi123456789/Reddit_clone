from litestar import Controller, get, post
from litestar.exceptions import HTTPException
from litestar.connection import ASGIConnection
from litestar.security.jwt import Token, JWTAuth
from litestar.response import Response

from typing import Any
import datetime
import bcrypt
import asyncio

from .tables import User
from .schema import RegisterSchema, LoginSchema, UserSchema
from utils.pwd_hash import hash_password, verify_password
from settings import ACCESS_TOKEN_TTL, TOKEN_SECRET, REFRESH_TOKEN_TTL
from utils.refresh import create_refresh_token

async def retrieve_user_handler(token: Token, connection: ASGIConnection) -> UserSchema | None:
    user_id = int(token.sub)
    if not user_id:
        return None
    users = await User.select().where(User.id == user_id)
    return users[0] if users else None

jwt_auth = JWTAuth[UserSchema](
    retrieve_user_handler=retrieve_user_handler,
    token_secret=TOKEN_SECRET,
    exclude=['/accounts/login', '/accounts/register', '/schema']
)

class UserController(Controller):
    path = '/accounts'

    @post('/register')
    async def register(self, data:RegisterSchema)->Response:
        #check if the email/username is already in use.
        already_exists = await User.exists().where((User.email == data.email) | (User.username == data.username))
        if already_exists:
            raise HTTPException(detail='A user with this email/username already exists', status_code=400)
        
        hashed_password = await hash_password(data.password)
        user = await User.objects().create(username=data.username, email=data.email, password=hashed_password)
        expires = datetime.datetime.now() + datetime.timedelta(seconds=ACCESS_TOKEN_TTL)
        access_token = Token(exp=expires, sub=str(user.id)).encode(secret=TOKEN_SECRET, algorithm='HS256')
        refresh_token = create_refresh_token(str(user.id))
        response = Response({'user':user, 'access_token':access_token})
        response.set_cookie('refresh_token', refresh_token, max_age=REFRESH_TOKEN_TTL, httponly=True, samesite='lax')
        return response
    
    @post('/login')
    async def login(self, data:LoginSchema)->Response:
        user = await User.select(User.id, User.username, User.email, User.password, User.is_admin).where((User.email == data.email) | (User.username == data.email))

        if not user:
            raise HTTPException(detail='Invalid username/password', status_code=400)
        
        user = user[0]
        is_valid = await verify_password(data.password, user['password'])
        if not is_valid:
            raise HTTPException(detail='Invalid username/password', status_code=400)
        
        expires = datetime.datetime.now() + datetime.timedelta(seconds=ACCESS_TOKEN_TTL)
        access_token = Token(exp=expires, sub=str(user.id)).encode(secret=TOKEN_SECRET, algorithm='HS256')
        refresh_token = create_refresh_token(str(user.id))
        #removing password, so it won't be seen from the client side.
        user.pop('password')
        response = Response({'user':user, 'access_token':access_token})
        response.set_cookie('refresh_token', refresh_token, max_age=REFRESH_TOKEN_TTL, httponly=True, samesite='lax')
        return response
