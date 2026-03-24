import React from "react"
import { useParams } from "react-router-dom"
import { getPostBySlug } from "../../services/posts"
import { useState } from "react"
import '../../styles/postbody.css'
import CommentInput from "../comments/CommentInput"
import type {CommentBody} from '../../services/comments'
import {createComment} from '../../services/comments'
const PostComments = React.lazy(()=>import('../comments/PostComments'))
import { votePost } from "../../services/vote"
import { Suspense } from "react"
import { useQuery } from '@tanstack/react-query'

const PostBody = ()=>{
    const { communityName, postId, postSlug } = useParams()
    const [commentJSON, setCommentJSON] = useState<string>('')
    const [commentHTML, setCommentHTML] = useState<string>('')

    const postQuery = useQuery({
        queryKey: ['post', postSlug],
        queryFn: async () => await getPostBySlug(postId!, postSlug!),
    })

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
                                <span className='community-name'>r/{postQuery.data?.community_name}</span>
                                <span className='time-ago-separator'>.</span>
                                <span className='time-ago'>2hr ago</span>
                            </div>
                            <span className='author-name'>{postQuery.data?.author_username}</span>
                        </div>
                    </div>
                </div>
                <div className='post-info-right-side'>
                    <i className="bi bi-three-dots"></i>
                </div>
            </header>

            <div className='post-title'>
                <h1>{postQuery.data?.title}</h1>
            </div>

            <div className = 'post-flair-body'>
                <div className='post-flair-tag' style={{backgroundColor: `${postQuery.data?.flair_color}`, padding: '4px 8px', borderRadius: '15px', display: 'inline-block', marginBottom: '12px', 'width':'fit-content'}}>
                    <span className='flair-text'>{postQuery.data?.flair_title}</span>
                </div>

                <div className='post-content' dangerouslySetInnerHTML={{ __html: postQuery.data?.content_html! }} />
            </div>

            <div className='post-interactions'>
                <div className='vote-section'>
                    <i className="bi bi-arrow-up vote-button" onClick={()=>handleVoteClick(postId!, 1)} style={{color: postQuery.data?.vote_status === 'upvoted' ? 'red' : 'black'}}></i>
                    <span className='vote-count'>{postQuery.data?.score}</span>
                    <i className="bi bi-arrow-down vote-button" onClick={()=>handleVoteClick(postId!, -1)} style={{color: postQuery.data?.vote_status === 'downvoted' ? 'red' : 'black'}}></i>
                </div>

                <div className='comment-section'>
                    <i className="bi bi-chat-left-text comment-icon"></i>
                    <span className='comment-count'>{postQuery.data?.comment_count}</span>
                </div>

                <div className='share-section'>
                    <i className="bi bi-share share-icon"></i>
                    <span className='share-text'>Share</span>
                </div>
            </div>

            <CommentInput onSave={handleSaveComment} setCommentJSON={setCommentJSON} setCommentHTML={setCommentHTML}/>
            <Suspense fallback={<p>Loading...</p>}>
                <PostComments postId={parseInt(postId!)} communityName={communityName!}/>
            </Suspense>
        </section>
    )
}

export default PostBody