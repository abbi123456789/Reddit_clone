import type { PostComment } from "../../services/comments"
import '../../styles/comments.css'
import { voteComment } from "../../services/vote"

type CommentCardProps = {
    comment: PostComment
}

const CommentCard = ({comment} :CommentCardProps) => {

    const handleVoteClick = async (commentId:number, value:number) => {
        const response = await voteComment(commentId, value)
        console.log(response)
    }

    return (
        <div className='comment'>
            <div className='comment-author'>
                <span>{comment.author_name}</span>
            </div>
            <div className='comment-content' dangerouslySetInnerHTML={{ __html: comment.content_html }} />
            <div className='comment-interactions'>
                <div className='comment-score'>
                    <i className='bi bi-arrow-up vote-button' onClick={()=>handleVoteClick(comment.id, 1)} style={{color: comment.vote_status === 'upvoted' ? 'red' : 'black'}}></i>
                    <span>{comment.score}</span>
                    <i className='bi bi-arrow-down vote-button' onClick={()=>handleVoteClick(comment.id, -1)} style={{color: comment.vote_status === 'downvoted' ? 'red' : 'black'}}></i>
                </div>

                <div className='comment-reply'>
                    <i className="bi bi-chat-left-text comment-icon"></i>
                    <span>Reply</span>
                </div>

                <div className='comment-share'>
                    <i className='bi bi-share share-icon'></i>
                    <span>share</span>
                </div>
            </div>
        </div>
    )
}

export default CommentCard