from litestar.security.jwt import Token

import datetime
from settings import REFRESH_TOKEN_TTL, TOKEN_SECRET

def create_refresh_token(sub: str):
    expires = datetime.datetime.now() + datetime.timedelta(seconds=REFRESH_TOKEN_TTL)
    extras = {'type': 'refresh'}
    token = Token(exp=expires, sub=sub, extras=extras)
    return token.encode(secret=TOKEN_SECRET, algorithm='HS256')

def decode_refresh_token(token: str):
    try:
        token = Token.decode(token, secret=TOKEN_SECRET, algorithms=['HS256'])
        if token.extras.get('type') != 'refresh':
            return None
        return token.sub
    except Exception:
        return None