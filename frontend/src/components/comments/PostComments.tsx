import { useEffect, useState } from "react";
import { getPostComments } from "../../services/comments";
import type { PostComment } from "../../services/comments";
import CommentCard from "./CommentCard";
import '../../styles/comments.css'

export type PostCommentProps = {
    communityName: string;
    postId: number;
}

const PostComments = ({communityName, postId}:PostCommentProps) => {
    const [comments, setComments] = useState<PostComment[]>([])
    useEffect(()=>{
        const fetchPostComments = async () => {
            const postComments = await getPostComments(postId, communityName);
            console.log(postComments)
            setComments(postComments)
        }
        fetchPostComments()
    }, [])
    return (
        <div className='post-comments'>
            {comments.map((comment)=>(
                <CommentCard comment={comment} key={comment.id} />
            ))}
        </div>
    )
}

export default PostComments