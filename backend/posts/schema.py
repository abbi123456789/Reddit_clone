from pydantic import BaseModel
from typing import Literal

class PostCreate(BaseModel):
    title: str
    content_html: str|None  = None
    content_json: dict|None = None
    community_name: str
    flair: str | None = None
    is_nsfw: bool = False
    is_spoiler: bool = False
    post_type: Literal['text', 'link', 'media'] = 'text'
    media_urls: list[str] | None = None
    link_url: str | None = None


class PostUpdate(BaseModel):
    title: str
    content_html: str|None = None
    content_json: dict|None = None
    community_name: str
    flair: str | None = None
    is_nsfw: bool = False
    is_spoiler: bool = False
    post_type: Literal['text', 'link', 'media'] = 'text'
    media_urls: list[str] | None = None
    link_url: str | None = None

class VoteSchema(BaseModel):
    value: Literal[-1, 1]
