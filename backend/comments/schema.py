from pydantic import BaseModel

class CommentSchema(BaseModel):
    content_json: dict
    content_html: str
    parent: int | None = None
    post: int
    community_name: str
