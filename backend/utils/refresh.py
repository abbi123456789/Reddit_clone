from settings import REFRESH_TOKEN_TTL, TOKEN_SECRET
from utils.tokens import create_typed_token, decode_typed_token

def create_refresh_token(sub: str):
    return create_typed_token(
        sub=sub,
        secret=TOKEN_SECRET,
        ttl_seconds=REFRESH_TOKEN_TTL,
        token_type="refresh",
    )

def decode_refresh_token(token: str):
    decoded = decode_typed_token(token, secret=TOKEN_SECRET, expected_type="refresh")
    return decoded.sub if decoded else None
