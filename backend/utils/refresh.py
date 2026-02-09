from litestar.security.jwt import Token

import datetime
from settings import REFRESH_TOKEN_TTL, TOKEN_SECRET

def create_refresh_token(sub: str):
    expires = datetime.datetime.now() + datetime.timedelta(seconds=REFRESH_TOKEN_TTL)
    extras = {'type': 'refresh'}
    token = Token(exp=expires, sub=sub, extras=extras)
    return token.encode(secret=TOKEN_SECRET, algorithm='HS256')