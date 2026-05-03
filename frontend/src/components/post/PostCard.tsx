import type { Post } from "../../services/posts";
import '../../styles/postcard.css'

type PostCardProps = {
    post: Post
}

export default function PostCard({post}: PostCardProps){
    return (
        <div className='post'>
            <div className='post-meta-data'>
                <div className='post-community'>
                    <strong className='community-name'>r/{post.community_name}</strong>
                </div>
                <span>.</span>
                <span>2hr. ago</span>
            </div>
            <div className='post-content'>
                <div className='post-title'>
                    <strong>{post.title}</strong>
                </div>
                <div className='post-body'>
                    <div className='post-content' dangerouslySetInnerHTML={{ __html: post.content_html! }} />
                </div>
            </div>
            <div className='post-interactions'>
                <div className='vote-section'>
                    <i className="bi bi-arrow-up vote-button" style={{color: post.vote_status === 'upvoted' ? 'red' : 'black'}}></i>
                    <span className='vote-count'>{post.score}</span>
                    <i className="bi bi-arrow-down vote-button" style={{color: post.vote_status === 'downvoted' ? 'red' : 'black'}}></i>
                </div>

                <div className='comment-section'>
                    <i className="bi bi-chat-left-text comment-icon"></i>
                    <span className='comment-count'>{post.comment_count}</span>
                </div>

                <div className='share-section'>
                    <i className="bi bi-share share-icon"></i>
                    <span className='share-text'>Share</span>
                </div>
            </div>
        </div>
    )
}