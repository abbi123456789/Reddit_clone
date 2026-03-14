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
    background_color: str
    text_color: str
    mod_only: bool = False
    hue: int | None
    saturation: int | None