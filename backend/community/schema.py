from pydantic import BaseModel
from typing import Literal

class CommunitySchema(BaseModel):
    name: str
    description: str
    category: str
    visibility: Literal['public', 'private', 'restricted']
    nsfw: bool

class FlairSchema(BaseModel):
    title: str
    color: str
    mod_only: bool
    hue: int | None
    saturation: int | None