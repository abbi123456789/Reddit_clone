from litestar import Litestar
from litestar.openapi.config import OpenAPIConfig
from litestar.config.cors import CORSConfig

from accounts.controllers import jwt_auth, UserController
from accounts.profile_controllers import ProfileController
from community.controllers import CommunityController
from posts.controllers import PostController
from comments.controllers import CommentController, CommentVoteController

cors_config = CORSConfig(
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
)


openapi_config = OpenAPIConfig(
    title="My API",
    version="1.0.0",
)

app = Litestar(
    route_handlers=[UserController, CommunityController, PostController, CommentController, CommentVoteController, ProfileController],
    on_app_init=[jwt_auth.on_app_init],
    openapi_config=openapi_config,
    cors_config = cors_config,
    debug = True
)