import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getPostBySlug } from "../../services/posts"
import { useState } from "react"
import '../../styles/postbody.css'
import type { Post } from "../../services/posts"
import CommentInput from "../comments/CommentInput"
import type {CommentBody} from '../../services/comments'
import {createComment} from '../../services/comments'
import PostComments from "../comments/PostComments"
import { votePost } from "../../services/vote"
    
const PostBody = ()=>{
    const { communityName, postId, postSlug } = useParams()
    const [post, setPost] = useState<Post | null>(null)
    const [commentJSON, setCommentJSON] = useState<string>('')
    const [commentHTML, setCommentHTML] = useState<string>('')

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postData = await getPostBySlug(postId!, postSlug!)
                console.log(postData)
                setPost(postData)
            } catch (error) {
                console.error("Error fetching post:", error)
            }
        }
        fetchPost()
    }, [postSlug])

    const handleSaveComment = async () => {
        const commentData: CommentBody = {
            content_json: JSON.parse(commentJSON),
            content_html: commentHTML,
            parent: null,
            post: parseInt(postId!),
            community_name: communityName!,
        }
        const response = await createComment(commentData)
        console.log(response)
    }

    const handleVoteClick = async (postId:string, value:number) => {
        const response = await votePost(postId, value)
        console.log(response)
    }

    return (
        <section className="post-detail-section">
            <header className='post-info-header'>
                <div className='post-info-left-side'>
                    <div className='back-button'>
                        <i className="bi bi-arrow-left"></i>
                    </div>
                    <div className='post-info'>
                        <img src='/images/communityIcon.jpg' alt='Community Icon' className='community-icon' />
                        <div className='post-meta-data'>
                            <div className='post-inner-meta-data'>
                                <span className='community-name'>r/developersIndia</span>
                                <span className='time-ago-separator'>.</span>
                                <span className='time-ago'>2hr ago</span>
                            </div>
                            <span className='author-name'>AdCapable2347</span>
                        </div>
                    </div>
                </div>
                <div className='post-info-right-side'>
                    <i className="bi bi-three-dots"></i>
                </div>
            </header>

            <div className='post-title'>
                <h1>{post?.title}</h1>
            </div>

            <div className = 'post-flair-body'>
                <div className='post-flair-tag' style={{backgroundColor: `${post?.flair_color}`, padding: '4px 8px', borderRadius: '15px', display: 'inline-block', marginBottom: '12px', 'width':'fit-content'}}>
                    <span className='flair-text'>{post?.flair_title}</span>
                </div>

                <div className='post-content' dangerouslySetInnerHTML={{ __html: post?.content_html }} />
            </div>

            <div className='post-interactions'>
                <div className='vote-section'>
                    <i className="bi bi-arrow-up vote-button" onClick={()=>handleVoteClick(postId!, 1)} style={{color: post?.vote_status === 'upvoted' ? 'red' : 'black'}}></i>
                    <span className='vote-count'>{post?.score}</span>
                    <i className="bi bi-arrow-down vote-button" onClick={()=>handleVoteClick(postId!, -1)} style={{color: post?.vote_status === 'downvoted' ? 'red' : 'black'}}></i>
                </div>

                <div className='comment-section'>
                    <i className="bi bi-chat-left-text comment-icon"></i>
                    <span className='comment-count'>{post?.comment_count}</span>
                </div>

                <div className='share-section'>
                    <i className="bi bi-share share-icon"></i>
                    <span className='share-text'>Share</span>
                </div>
            </div>

            <CommentInput onSave={handleSaveComment} setCommentJSON={setCommentJSON} setCommentHTML={setCommentHTML}/>
            <PostComments postId={parseInt(postId!)} communityName={communityName!}/>
        </section>
    )
}

export default PostBody