from pydantic import BaseModel
from typing import Literal

class CommentSchema(BaseModel):
    content_json: dict
    content_html: str
    parent: int | None = None
    post: int
    community_name: str

class CommentVoteSchema(BaseModel):
    value: Literal[1, -1]