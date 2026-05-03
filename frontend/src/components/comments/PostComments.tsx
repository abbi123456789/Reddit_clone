import React, { useState } from "react";
import { getPostComments } from "../../services/comments";
const CommentCard = React.lazy(()=>import('./CommentCard'))
import '../../styles/comments.css'
import {QueryClient, useQuery} from '@tanstack/react-query'
import { buildCommentTree } from "../../utils/buildCommentTree";

export type PostCommentProps = {
    postId: number;
}

const PostComments = ({postId}:PostCommentProps) => {
    const [activeReplyCommentId, setIsActiveReplyCommentId] = useState<number | null>(null)
    const {data: comments} = useQuery({
        queryKey: ['comments', postId],
        queryFn: async () => await getPostComments(postId)
    })

    const commentTree = React.useMemo(()=>buildCommentTree(comments || []), [comments])
    return (
        <div className='post-comments'>
            {commentTree.map((comment)=>(
                <CommentCard 
                    comment={comment} 
                    key={comment.id} 
                    depth={0} 
                    activeReplyCommentId={activeReplyCommentId}
                    onReply = {setIsActiveReplyCommentId}
                />
            ))}
        </div>
    )
}

export default PostComments