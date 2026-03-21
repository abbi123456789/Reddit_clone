from pydantic import BaseModel
from typing import Literal

class PostCreate(BaseModel):
    title: str
    content_html: str
    content_json: dict
    community_name: str
    flair: str | None = None
    is_nsfw: bool = False
    is_spoiler: bool = False

class VoteSchema(BaseModel):
    value: Literal[-1, 1]