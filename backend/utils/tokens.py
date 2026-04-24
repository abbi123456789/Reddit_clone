import datetime

from litestar.security.jwt import Token

from settings import (
    ACCESS_TOKEN_TTL,
    OAUTH_STATE_TOKEN_TTL,
    TOKEN_SECRET,
    VERIFICATION_TOKEN_SECRET,
    VERIFICATION_TOKEN_TTL,
)


def _utcnow() -> datetime.datetime:
    return datetime.datetime.now(datetime.timezone.utc)


def build_access_token(sub: str) -> str:
    expires = _utcnow() + datetime.timedelta(seconds=ACCESS_TOKEN_TTL)
    token = Token(exp=expires, sub=sub)
    return token.encode(secret=TOKEN_SECRET, algorithm="HS256")


def create_typed_token(
    *,
    sub: str,
    secret: str,
    ttl_seconds: int,
    token_type: str,
    extras: dict | None = None,
) -> str:
    expires = _utcnow() + datetime.timedelta(seconds=ttl_seconds)
    payload = {"type": token_type}
    if extras:
        payload.update(extras)
    token = Token(exp=expires, sub=sub, extras=payload)
    return token.encode(secret=secret, algorithm="HS256")


def decode_typed_token(token: str, *, secret: str, expected_type: str) -> Token | None:
    try:
        decoded = Token.decode(token, secret=secret, algorithms=["HS256"])
        if decoded.extras.get("type") != expected_type:
            return None
        return decoded
    except Exception:
        return None


def create_email_verification_token(sub: str, email: str) -> str:
    return create_typed_token(
        sub=sub,
        secret=VERIFICATION_TOKEN_SECRET,
        ttl_seconds=VERIFICATION_TOKEN_TTL,
        token_type="email_verification",
        extras={"email": email},
    )


def decode_email_verification_token(token: str) -> Token | None:
    return decode_typed_token(
        token,
        secret=VERIFICATION_TOKEN_SECRET,
        expected_type="email_verification",
    )


def create_oauth_state_token() -> str:
    return create_typed_token(
        sub="google_oauth",
        secret=TOKEN_SECRET,
        ttl_seconds=OAUTH_STATE_TOKEN_TTL,
        token_type="oauth_state",
    )


def decode_oauth_state_token(token: str) -> Token | None:
    return decode_typed_token(token, secret=TOKEN_SECRET, expected_type="oauth_state")
