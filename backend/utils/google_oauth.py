import asyncio
import json
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from settings import GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI

GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USERINFO_URL = "https://openidconnect.googleapis.com/v1/userinfo"


def build_google_oauth_url(state: str) -> str:
    params = urlencode(
        {
            "client_id": GOOGLE_CLIENT_ID,
            "redirect_uri": GOOGLE_REDIRECT_URI,
            "response_type": "code",
            "scope": "openid email profile",
            "access_type": "online",
            "prompt": "select_account",
            "state": state,
        }
    )
    return f"{GOOGLE_AUTH_URL}?{params}"


def _request_json(url: str, *, data: bytes | None = None, headers: dict | None = None) -> dict:
    request = Request(url, data=data, headers=headers or {})
    try:
        with urlopen(request, timeout=20) as response:
            return json.loads(response.read().decode("utf-8"))
    except (HTTPError, URLError, TimeoutError) as exc:
        raise ValueError("Google request failed") from exc


async def exchange_code_for_google_user(code: str) -> dict:
    form_body = urlencode(
        {
            "code": code,
            "client_id": GOOGLE_CLIENT_ID,
            "client_secret": GOOGLE_CLIENT_SECRET,
            "redirect_uri": GOOGLE_REDIRECT_URI,
            "grant_type": "authorization_code",
        }
    ).encode("utf-8")

    token_payload = await asyncio.to_thread(
        _request_json,
        GOOGLE_TOKEN_URL,
        data=form_body,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    access_token = token_payload.get("access_token")
    if not access_token:
        raise ValueError("Missing Google access token")

    user_info = await asyncio.to_thread(
        _request_json,
        GOOGLE_USERINFO_URL,
        headers={"Authorization": f"Bearer {access_token}"},
    )

    email = user_info.get("email")
    google_sub = user_info.get("sub")
    if not email or not google_sub or not user_info.get("email_verified"):
        raise ValueError("Google account is missing a verified email")

    return {
        "google_sub": google_sub,
        "email": email.lower(),
        "name": user_info.get("name") or "",
        "given_name": user_info.get("given_name") or "",
    }
