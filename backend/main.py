from litestar import Litestar
from litestar.openapi.config import OpenAPIConfig
from litestar.config.cors import CORSConfig

from accounts.controllers import jwt_auth, UserController
from community.controllers import CommunityController

cors_config = CORSConfig(
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
)


openapi_config = OpenAPIConfig(
    title="My API",
    version="1.0.0",
)

app = Litestar(
    route_handlers=[UserController, CommunityController],
    on_app_init=[jwt_auth.on_app_init],
    openapi_config=openapi_config,
    cors_config = cors_config,
    debug = True
)