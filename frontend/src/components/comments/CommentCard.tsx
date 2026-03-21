import type { PostComment } from "../../services/comments"
import '../../styles/comments.css'
type CommentCardProps = {
    comment: PostComment
}

const CommentCard = ({comment} :CommentCardProps) => {
    return (
        <div className='comment'>
            <div className='comment-author'>
                <span>{comment.author_name}</span>
            </div>
            <div className='comment-content' dangerouslySetInnerHTML={{ __html: comment.content_html }} />
            <div className='comment-interactions'>
                <div className='comment-score'>
                    <i className='bi bi-arrow-up vote-button'></i>
                    <span>10</span>
                    <i className='bi bi-arrow-down vote-button'></i>
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