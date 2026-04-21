import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserComments } from "../../services/profile";
import type { UserComments } from "../../services/profile";

export default function CommentsTab() {
    const {data: userComments} = useSuspenseQuery({
        queryKey: ['userComments'],
        queryFn: async () => await getUserComments()
    })

    return (
    <>
        {userComments?.map(comment=>(
            <CommentCard key={comment.id} comment={comment} />
        ))}
    </>
    )
}

function CommentCard({comment} : {comment : UserComments}) {
    return (
        <div className="user-comment-card">
            <div className="community-info">
                <span>r/{comment.community_name}</span>
                <span>.</span>
            </div>
            <div className="comment-post-title">
                <span>{comment.post_title}</span>
            </div>
            <div className="comment-author-info">
                <span>{comment.comment_author}</span>
                <span>1 mo. ago</span>
            </div>
            <div className="comment-content">
                <span dangerouslySetInnerHTML={{__html: comment.left}} />
            </div>
            <div className='comment-interactions'>
                <div className='comment-score'>
                    <i className='bi bi-arrow-up vote-button' style={{color: comment.status === 'upvoted' ? 'red' : 'black'}}></i>
                    <span>{comment.score}</span>
                    <i className='bi bi-arrow-down vote-button' style={{color: comment.status === 'downvoted' ? 'red' : 'black'}}></i>
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