from dotenv import load_dotenv
import os

load_dotenv()

def get_env_int(name: str, default: int) -> int:
    value = os.getenv(name)
    return int(value) if value is not None else default


def get_env_bool(name: str, default: bool = False) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.lower() in {"1", "true", "yes", "on"}


TOKEN_SECRET = os.getenv("TOKEN_SECRET", "development-token-secret")
REFRESH_TOKEN_TTL = get_env_int("REFRESH_TOKEN_TTL", 60 * 60 * 24 * 15)
ACCESS_TOKEN_TTL = get_env_int("ACCESS_TOKEN_TTL", 60 * 60 * 24 * 7)
VERIFICATION_TOKEN_SECRET = os.getenv("VERIFICATION_TOKEN_SECRET", TOKEN_SECRET)
VERIFICATION_TOKEN_TTL = get_env_int("VERIFICATION_TOKEN_TTL", 60 * 60 * 24)
OAUTH_STATE_TOKEN_TTL = get_env_int("OAUTH_STATE_TOKEN_TTL", 600)

BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000").rstrip("/")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173").rstrip("/")
COOKIE_SECURE = get_env_bool("COOKIE_SECURE", False)

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "")
GOOGLE_REDIRECT_URI = os.getenv(
    "GOOGLE_REDIRECT_URI",
    f"{BACKEND_URL}/accounts/google/callback",
)

SMTP_HOST = os.getenv("SMTP_HOST", "")
SMTP_PORT = get_env_int("SMTP_PORT", 587)
SMTP_USERNAME = os.getenv("SMTP_USERNAME", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
SMTP_FROM_EMAIL = os.getenv("SMTP_FROM_EMAIL", "")
SMTP_USE_TLS = get_env_bool("SMTP_USE_TLS", True)
