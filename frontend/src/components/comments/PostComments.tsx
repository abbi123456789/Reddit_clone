import React, { useState } from "react";
import { getPostComments } from "../../services/comments";
const CommentCard = React.lazy(()=>import('./CommentCard'))
import '../../styles/comments.css'
import {useQuery} from '@tanstack/react-query'
import { buildCommentTree } from "../../utils/buildCommentTree";

export type PostCommentProps = {
    communityName: string;
    postId: number;
}

const PostComments = ({communityName, postId}:PostCommentProps) => {
    const [activeReplyCommentId, setIsActiveReplyCommentId] = useState<number | null>(null)

    const {data: comments} = useQuery({
        queryKey: ['comments', postId],
        queryFn: async () => await getPostComments(postId, communityName)
    })

    const commentTree = buildCommentTree(comments || [])
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