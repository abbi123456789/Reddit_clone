import React, { startTransition, useOptimistic, useEffect } from "react"
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

    const [voteState, setVoteState] = useState<{score: number, vote_status: string}>({
        score: postQuery.data?.score || 0,
        vote_status: postQuery.data?.vote_status || 'not_voted'
    })

    useEffect(()=>{
        setVoteState({score: postQuery.data?.score! || 0, vote_status: postQuery.data?.vote_status! || 'not_voted'})
    }, [postQuery.data])

    const [optimisticVote, dispatch] = useOptimistic(
        voteState,
        (current, action:{type: 'upvote' | 'downvote'}) => {
            switch(action.type){
                case 'upvote':
                    if(current.vote_status == 'not_voted'){
                        return {score: current.score + 1, vote_status: 'upvoted'}
                    }else if(current.vote_status == 'upvoted'){
                        return {score: current.score - 1, vote_status: 'not_voted'}
                    }else if(current.vote_status == 'downvoted'){
                        return {score: current.score + 2, vote_status: 'upvoted'}
                    }
                case 'downvote':
                    if(current.vote_status == 'not_voted'){
                        return {score: current.score - 1, vote_status: 'downvoted'}
                    }else if(current.vote_status == 'downvoted'){
                        return {score: current.score + 1, vote_status: 'not_voted'}
                    }else if(current.vote_status == 'upvoted'){
                        return {score: current.score - 2, vote_status: 'downvoted'}
                    }
            }
        }
    )


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
        setVoteState({score: response.new_score, vote_status: response.status})
    }

    function handleUpvoteClick(){
        startTransition(async () => {
            dispatch({type: 'upvote'})
            await handleVoteClick(postId!, 1)
        })
    }

    function handleDownvoteClick(){
        startTransition(async () => {
            dispatch({type: 'downvote'})
            await handleVoteClick(postId!, -1)
        })
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
                    <i className="bi bi-arrow-up vote-button" onClick={()=>handleUpvoteClick()} style={{color: optimisticVote.vote_status === 'upvoted' ? 'red' : 'black'}}></i>
                    <span className='vote-count'>{optimisticVote.score}</span>
                    <i className="bi bi-arrow-down vote-button" onClick={()=>handleDownvoteClick()} style={{color: optimisticVote.vote_status === 'downvoted' ? 'red' : 'black'}}></i>
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