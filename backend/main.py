from litestar import Litestar
from litestar.openapi.config import OpenAPIConfig

from accounts.controllers import jwt_auth, UserController

openapi_config = OpenAPIConfig(
    title="My API",
    version="1.0.0",
)

app = Litestar(
    route_handlers=[UserController],
    on_app_init=[jwt_auth.on_app_init],
    openapi_config=openapi_config
)