import re
from urllib.parse import urlencode

from litestar import Controller, get, post, Request
from litestar.exceptions import HTTPException
from litestar.connection import ASGIConnection
from litestar.security.jwt import Token, JWTAuth
from litestar.response import Redirect, Response
from litestar.params import Parameter

from typing import Any, Annotated

from .tables import User
from .schema import RegisterSchema, LoginSchema, ResendVerificationSchema, UserSchema
from utils.pwd_hash import hash_password, verify_password
from settings import (
    COOKIE_SECURE,
    FRONTEND_URL,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    REFRESH_TOKEN_TTL,
    TOKEN_SECRET,
)
from utils.email_sender import send_verification_email
from utils.google_oauth import build_google_oauth_url, exchange_code_for_google_user
from utils.refresh import create_refresh_token, decode_refresh_token
from utils.tokens import (
    build_access_token,
    create_email_verification_token,
    create_oauth_state_token,
    decode_email_verification_token,
    decode_oauth_state_token,
)


def serialize_user(user: User | dict[str, Any]) -> dict[str, Any]:
    if isinstance(user, dict):
        payload = dict(user)
    else:
        payload = user.to_dict()

    payload.pop("password", None)
    return {
        "id": payload["id"],
        "email": payload["email"],
        "username": payload["username"],
        "is_admin": payload["is_admin"],
        "created_at": payload.get("created_at"),
        "email_verified": payload.get("email_verified", False),
        "auth_provider": payload.get("auth_provider", "local"),
    }


def build_auth_response(user: User | dict[str, Any]) -> Response:
    serialized_user = serialize_user(user)
    access_token = build_access_token(str(serialized_user["id"]))
    response = Response({"user": serialized_user, "access_token": access_token})
    set_refresh_cookie(response, str(serialized_user["id"]))
    return response


def build_error(detail: str, code: str, status_code: int) -> HTTPException:
    return HTTPException(detail={"message": detail, "code": code}, status_code=status_code)


def sanitize_username(value: str) -> str:
    username = re.sub(r"[^a-zA-Z0-9_]", "_", value).strip("_").lower()
    return username[:30] or "user"


async def generate_unique_username(base_value: str) -> str:
    base = sanitize_username(base_value)
    candidate = base
    suffix = 1

    while await User.exists().where(User.username == candidate):
        suffix += 1
        suffix_text = str(suffix)
        candidate = f"{base[: max(1, 30 - len(suffix_text))]}{suffix_text}"

    return candidate


def redirect_with_error(code: str, message: str) -> Redirect:
    query = urlencode({"oauth_error": code, "message": message})
    return Redirect(f"{FRONTEND_URL}/login?{query}", status_code=302)


def build_oauth_success_redirect() -> Redirect:
    return Redirect(f"{FRONTEND_URL}/auth/callback?provider=google", status_code=302)


def set_refresh_cookie(response: Response, user_id: str) -> None:
    refresh_token = create_refresh_token(user_id)
    response.set_cookie(
        "refresh_token",
        refresh_token,
        max_age=REFRESH_TOKEN_TTL,
        httponly=True,
        samesite="lax",
        secure=COOKIE_SECURE,
    )

async def retrieve_user_handler(token: Token, connection: ASGIConnection) -> UserSchema | None:
    user_id = int(token.sub)
    if not user_id:
        return None
    user = await User.select().where(User.id == user_id).first()
    return serialize_user(user) if user else None

jwt_auth = JWTAuth[UserSchema](
    retrieve_user_handler=retrieve_user_handler,
    token_secret=TOKEN_SECRET,
    exclude=[
        '/accounts/login',
        '/accounts/register',
        '/accounts/refresh',
        '/accounts/verify-email',
        '/accounts/resend-verification',
        '/accounts/google/start',
        '/accounts/google/callback',
    ]
)

class UserController(Controller):
    path = '/accounts'

    @post('/register')
    async def register(self, data:RegisterSchema)->Response:
        email = data.email.lower()
        already_exists = await User.exists().where((User.email == email) | (User.username == data.username))
        if already_exists:
            raise build_error('A user with this email/username already exists', 'user_exists', 400)

        hashed_password = await hash_password(data.password)
        user = await User.objects().create(
            username=data.username,
            email=email,
            password=hashed_password,
            auth_provider='local',
            email_verified=False,
        )
        token = create_email_verification_token(str(user.id), user.email)
        await send_verification_email(user.email, user.username, token)
        return Response(
            {
                'message': 'Registration successful. Please verify your email before logging in.',
                'verification_required': True,
                'email': user.email,
            },
            status_code=201,
        )

    @post('/login')
    async def login(self, data:LoginSchema)->Response:
        user = await User.select(
            User.id,
            User.username,
            User.email,
            User.password,
            User.is_admin,
            User.created_at,
            User.email_verified,
            User.auth_provider,
        ).where((User.email == data.identifier.lower()) | (User.username == data.identifier)).first()

        if not user:
            raise build_error('Invalid username/password', 'invalid_credentials', 400)

        if user['auth_provider'] != 'local':
            raise build_error(
                'This account uses Google sign-in. Please continue with Google.',
                'oauth_account',
                400,
            )

        if not user['email_verified']:
            raise build_error(
                'Please verify your email before logging in.',
                'email_unverified',
                403,
            )

        if not user['password']:
            raise build_error('Invalid username/password', 'invalid_credentials', 400)

        is_valid = await verify_password(data.password, user['password'])
        if not is_valid:
            raise build_error('Invalid username/password', 'invalid_credentials', 400)

        return build_auth_response(user)

    @get('/verify-email')
    async def verify_email(self, token: str) -> Response:
        decoded = decode_email_verification_token(token)
        if not decoded:
            raise build_error('This verification link is invalid or expired.', 'invalid_verification_token', 400)

        user = await User.select(
            User.id,
            User.email,
            User.auth_provider,
            User.email_verified,
        ).where(User.id == int(decoded.sub)).first()
        if not user or user['email'] != decoded.extras.get('email'):
            raise build_error('This verification link is invalid or expired.', 'invalid_verification_token', 400)

        if user['auth_provider'] != 'local':
            raise build_error('Only password accounts can be verified by email.', 'invalid_verification_target', 400)

        if not user['email_verified']:
            await User.update({User.email_verified: True}).where(User.id == user['id'])

        return Response({'message': 'Email verified successfully.', 'verified': True})

    @post('/resend-verification')
    async def resend_verification(self, data: ResendVerificationSchema) -> Response:
        user = await User.select(
            User.id,
            User.email,
            User.username,
            User.email_verified,
            User.auth_provider,
        ).where(User.email == data.email.lower()).first()

        if not user:
            raise build_error('No account was found for that email.', 'user_not_found', 404)

        if user['auth_provider'] != 'local':
            raise build_error('This account uses Google sign-in.', 'oauth_account', 400)

        if user['email_verified']:
            raise build_error('This email is already verified.', 'email_already_verified', 400)

        token = create_email_verification_token(str(user['id']), user['email'])
        await send_verification_email(user['email'], user['username'], token)
        return Response({'message': 'Verification email sent.', 'verification_required': True})

    @get('/google/start')
    async def google_start(self) -> Redirect:
        if not GOOGLE_CLIENT_ID or not GOOGLE_CLIENT_SECRET:
            raise build_error('Google OAuth is not configured on the server.', 'google_oauth_not_configured', 500)

        oauth_state = create_oauth_state_token()
        response = Redirect(build_google_oauth_url(oauth_state), status_code=302)
        response.set_cookie(
            'oauth_state',
            oauth_state,
            max_age=600,
            httponly=True,
            samesite='lax',
            secure=COOKIE_SECURE,
        )
        return response

    @get('/google/callback')
    async def google_callback(
        self,
        request: Request,
        code: str | None = None,
        oauth_state: Annotated[str | None, Parameter(query='state', required=False)] = None,
        error: str | None = None,
    ) -> Redirect:
        if error:
            return redirect_with_error('google_access_denied', 'Google sign-in was cancelled.')

        cookie_state = request.cookies.get('oauth_state')
        if not oauth_state or not cookie_state or oauth_state != cookie_state or not decode_oauth_state_token(oauth_state):
            return redirect_with_error('google_state_invalid', 'Google sign-in could not be verified.')

        if not code:
            return redirect_with_error('google_missing_code', 'Google sign-in did not return an authorization code.')

        try:
            profile = await exchange_code_for_google_user(code)
        except ValueError:
            return redirect_with_error('google_exchange_failed', 'Google sign-in failed. Please try again.')

        user = await User.select().where(User.google_sub == profile['google_sub']).first()
        if not user:
            existing_email_user = await User.select().where(User.email == profile['email']).first()
            if existing_email_user:
                if existing_email_user['auth_provider'] == 'local':
                    response = redirect_with_error(
                        'account_exists_password',
                        'An account with this email already exists. Please use your password login.',
                    )
                    response.delete_cookie('oauth_state')
                    return response
                user = existing_email_user
                await User.update({User.google_sub: profile['google_sub']}).where(User.id == user['id'])
                user['google_sub'] = profile['google_sub']
            else:
                username_seed = profile['given_name'] or profile['name'] or profile['email'].split('@')[0]
                username = await generate_unique_username(username_seed)
                created_user = await User.objects().create(
                    username=username,
                    email=profile['email'],
                    password='',
                    auth_provider='google',
                    email_verified=True,
                    google_sub=profile['google_sub'],
                )
                user = created_user

        response = build_oauth_success_redirect()
        response.delete_cookie('oauth_state')
        set_refresh_cookie(response, str(serialize_user(user)['id']))
        return response

    @post('/refresh')
    async def refresh(self, request:Request)->Response:
        refresh_token = request.cookies.get('refresh_token')
        if not refresh_token:
            raise HTTPException(detail='Refresh token not found', status_code=401)
        user_id = decode_refresh_token(refresh_token)
        if not user_id:
            raise HTTPException(detail='Invalid refresh token', status_code=401)
        user = await User.objects().get(User.id == int(user_id))
        user = serialize_user(user)
        access_token = build_access_token(str(user['id']))
        return Response({'access_token':access_token, 'user':user})
