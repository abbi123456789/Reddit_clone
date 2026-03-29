import React from "react";
import { getPostComments } from "../../services/comments";
const CommentCard = React.lazy(()=>import('./CommentCard'))
import '../../styles/comments.css'
import {useQuery} from '@tanstack/react-query'

export type PostCommentProps = {
    communityName: string;
    postId: number;
}

const PostComments = ({communityName, postId}:PostCommentProps) => {
    const {data: comments, isPending, isError} = useQuery({
        queryKey: ['comments', postId],
        queryFn: async () => await getPostComments(postId, communityName)
    })

    return (
        <div className='post-comments'>
            {comments?.map((comment)=>(
                <CommentCard comment={comment} key={comment.id} />
            ))}
        </div>
    )
}

export default PostComments