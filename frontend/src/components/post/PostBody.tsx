import React from "react"
import { useParams } from "react-router-dom"
import { getPostBySlug, type Post } from "../../services/posts"
import { useState } from "react"
import '../../styles/postbody.css'
import CommentInput from "../comments/CommentInput"
import type {CommentBody} from '../../services/comments'
import {createComment} from '../../services/comments'
const PostComments = React.lazy(()=>import('../comments/PostComments'))
import { votePost } from "../../services/vote"
import { Suspense } from "react"
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { updateScore } from "../../utils/updateScore"
import { useAuth } from "../../context/AuthContext"
import { Button } from "react-aria-components"

const PostBody = ()=>{
    const { communityName, postId, postSlug } = useParams()
    const [commentJSON, setCommentJSON] = useState<string>('')
    const [commentHTML, setCommentHTML] = useState<string>('')
    // To check, if the comment input box is active or not, when user clicks on it, it becomes active and shows the comment editor, otherwise it shows the placeholder text
    const [isActive, setIsActive] = useState(false)
    const { isAuthenticated } = useAuth()

    const queryClient = useQueryClient()

    const {data} = useQuery({
        queryKey: ['post', postSlug],
        queryFn: async () => await getPostBySlug(postId!, postSlug!),
    })

    const postScoreMutation = useMutation({
        mutationFn: votePost,
        onMutate: async (variables) => {
            const {value} = variables
            await queryClient.cancelQueries({queryKey: ['post', postSlug]})

            const previousPost = queryClient.getQueryData(['post', postSlug]) as Post
            //We are optimistically updating the post details, when user either clicks on upvote or downvote
            queryClient.setQueryData(['post', postSlug], {
                ...previousPost, 
                ...updateScore(previousPost.score, value, previousPost.vote_status),
            })

            return {previousPost}
        },

        onError: (_err, _variables, context) => {
            queryClient.setQueryData(['post', postSlug], context!.previousPost)
        },

        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['post', postSlug]})
        }
    })

    //change it to useMutatin
    const commentCreationMutation = useMutation({
        mutationFn: createComment,
        onMutate: async (variables) => {
            const {community_name, content_html, content_json, parent, post} = variables;
            const previousComments = queryClient.getQueryData(['comments', postId]) as CommentBody[]
            const newComments = [...previousComments, {content_json, community_name, content_html, parent, post}]
            queryClient.setQueryData(['comments', postId], newComments)
            return {previousComments}
        },
        onError: (_err, _newComment, context) => {
            queryClient.setQueryData(['comments', postId], context?.previousComments)
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['comments', postId]})
        }
    })

    const handleSaveComment = async () => {
        const commentData: CommentBody = {
            content_json: JSON.parse(commentJSON),
            content_html: commentHTML,
            parent: null,
            post: parseInt(postId!),
            community_name: communityName!,
        }
        commentCreationMutation.mutate(commentData)
        setCommentHTML('')
        setCommentJSON('')
        setIsActive(false)
    }

    const handleVoteClick = async (postId:string, value: 1 | -1) => {
        postScoreMutation.mutate({postId, value})
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
                                <span className='community-name'>r/{data?.community_name}</span>
                                <span className='time-ago-separator'>.</span>
                                <span className='time-ago'>2hr ago</span>
                            </div>
                            <span className='author-name'>{data?.author_username}</span>
                        </div>
                    </div>
                </div>
                <div className='post-info-right-side'>
                    <i className="bi bi-three-dots"></i>
                </div>
            </header>

            <div className='post-title'>
                <h1>{data?.title}</h1>
            </div>

            <div className = 'post-flair-body'>
                <div className='post-flair-tag' style={{backgroundColor: `${data?.flair_color}`, padding: '4px 8px', borderRadius: '15px', display: 'inline-block', marginBottom: '12px', 'width':'fit-content'}}>
                    <span className='flair-text'>{data?.flair_title}</span>
                </div>

                <div className='post-content' dangerouslySetInnerHTML={{ __html: data?.content_html! }} />
            </div>

            <div className='post-interactions'>
                <div className='vote-section'>
                    <Button className="vote-button" aria-label="Upvote post" onPress={()=>handleVoteClick(postId!, 1)} style={{color: data?.vote_status === 'upvoted' ? 'red' : 'black'}}>
                        <i className="bi bi-arrow-up"></i>
                    </Button>
                    <span className='vote-count'>{data?.score}</span>
                    <Button className="vote-button" aria-label="Downvote post" onPress={()=>handleVoteClick(postId!, -1)} style={{color: data?.vote_status === 'downvoted' ? 'red' : 'black'}}>
                        <i className="bi bi-arrow-down"></i>
                    </Button>
                </div>

                <div className='comment-section'>
                    <i className="bi bi-chat-left-text comment-icon"></i>
                    <span className='comment-count'>{data?.comment_count}</span>
                </div>

                <div className='share-section'>
                    <i className="bi bi-share share-icon"></i>
                    <span className='share-text'>Share</span>
                </div>
            </div>

            { isAuthenticated && 
                <CommentInput onSave={handleSaveComment} setCommentJSON={setCommentJSON} setCommentHTML={setCommentHTML} isActive={isActive} setIsActive={setIsActive}/>
            }
            <Suspense fallback={<p>Loading...</p>}>
                <PostComments postId={parseInt(postId!)} />
            </Suspense>
        </section>
    )
}

export default PostBody
