from litestar.security.jwt import JWTAuthenticationMiddleware
from litestar.types import ASGIApp, Scopes, Method
from litestar.connection import ASGIConnection
from litestar.security.jwt.token import Token
from litestar.middleware.authentication import AuthenticationResult

from typing import Any, Awaitable, Callable, Sequence

class CustomJWTAuthenticationMiddleware(JWTAuthenticationMiddleware):
    def __init__(
        self,
        algorithm: str,
        app: ASGIApp,
        auth_header: str,
        exclude: str | list[str] | None,
        exclude_http_methods: Sequence[Method] | None,
        exclude_opt_key: str,
        retrieve_user_handler: Callable[[Token, ASGIConnection[Any, Any, Any, Any]], Awaitable[Any]],
        scopes: Scopes,
        token_secret: str,
        token_cls: type[Token] = Token,
        token_audience: Sequence[str] | None = None,
        token_issuer: Sequence[str] | None = None,
        require_claims: Sequence[str] | None = None,
        verify_expiry: bool = True,
        verify_not_before: bool = True,
        strict_audience: bool = False,
        revoked_token_handler: Callable[[Token, ASGIConnection[Any, Any, Any, Any]], Awaitable[Any]] | None = None,
    ):
        super().__init__(
            algorithm=algorithm,
            app=app,
            auth_header=auth_header,
            exclude=exclude,
            exclude_http_methods=exclude_http_methods,
            exclude_opt_key=exclude_opt_key,
            retrieve_user_handler=retrieve_user_handler,
            scopes=scopes,
            token_secret=token_secret,
            token_cls=token_cls,
            token_audience=token_audience,
            token_issuer=token_issuer,
            require_claims=require_claims,
            verify_expiry=verify_expiry,
            verify_not_before=verify_not_before,
            strict_audience=strict_audience,
            revoked_token_handler=revoked_token_handler,
        )

    async def authenticate_request(self, connection: ASGIConnection[Any, Any, Any, Any]) -> AuthenticationResult:
        auth_header = connection.headers.get(self.auth_header)
        if not auth_header:
            return AuthenticationResult(user=None, auth=None)
        encoded_token = auth_header.partition(" ")[-1]
        return await self.authenticate_token(encoded_token, connection)
    
    async def authenticate_token(self, encoded_token: str, connection: ASGIConnection[Any, Any, Any, Any]) -> AuthenticationResult:
        token = self.token_cls.decode(
            encoded_token=encoded_token,
            secret=self.token_secret,
            algorithm=self.algorithm,
            audience=self.token_audience,
            issuer=self.token_issuer,
            require_claims=self.require_claims,
            verify_exp=self.verify_expiry,
            verify_nbf=self.verify_not_before,
            strict_audience=self.strict_audience,
        )

        user = await self.retrieve_user_handler(token, connection)
        token_revoked = False

        if self.revoked_token_handler:
            token_revoked = await self.revoked_token_handler(token, connection)

        if not user or token_revoked:
            user, auth = None, None

        return AuthenticationResult(user=user, auth=token)
