import secrets

def generate_secret(n: int=32) -> str:
    return secrets.token_urlsafe(n)