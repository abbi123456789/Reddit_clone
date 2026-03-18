from litestar import Controller, get, post

from .tables import Post

class PostController(Controller):
    path = '/posts'

    @post('/create')
    async def create_post(self):
        raise NotImplementedError("This endpoint will handle post creation")
    
    @get('/{post_id:int}')
    async def get_post(self, post_id: int):
        raise NotImplementedError("This endpoint will handle fetching a specific post")
    
    @post('/{post_id:int}/upvote')
    async def upvote_post(self, post_id: int):
        raise NotImplementedError("This endpoint will handle upvoting a post")
    
    @post('/{post_id:int}/downvote')
    async def downvote_post(self, post_id: int):
        raise NotImplementedError("This endpoint will handle downvoting a post")
    
    @post('/{post_id:int}/edit')
    async def edit_post(self, post_id: int):
        raise NotImplementedError("This endpoint will handle editing a post")
    
    @post('/{post_id:int}/delete')
    async def delete_post(self, post_id: int): 
        raise NotImplementedError("This endpoint will handle deleting a post")
    
    @post('/{post_id:int}/pin')
    async def pin_post(self, post_id: int):
        raise NotImplementedError("This endpoint will handle pinning a post")
    
    @post('/{post_id:int}/lock')
    async def lock_post(self, post_id: int):
        raise NotImplementedError("This endpoint will handle locking a post")