import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPostBySlug, type Post, type PostEditorDraft } from "../../services/posts"
import { useState } from "react"
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
    const navigate = useNavigate()
    const { communityName, postId, postSlug } = useParams()
    const [commentJSON, setCommentJSON] = useState<string>('')
    const [commentHTML, setCommentHTML] = useState<string>('')
    // To check, if the comment input box is active or not, when user clicks on it, it becomes active and shows the comment editor, otherwise it shows the placeholder text
    const [isActive, setIsActive] = useState(false)
    const { isAuthenticated, user } = useAuth()

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

    const handleEditPost = () => {
        if (!data) {
            return
        }

        const postDraft: PostEditorDraft = {
            mode: 'edit',
            postId: data.id,
            postSlug: data.slug,
            title: data.title,
            content_html: data.content_html,
            content_json: data.content_json,
            community_name: data.community_name,
            flair_title: data.flair_title,
            is_nsfw: false,
            is_spoiler: false,
        }

        navigate(`/r/${data.community_name}/submit`, {
            state: postDraft,
        })
    }

    const voteButtonClass = "cursor-pointer border-0 bg-transparent px-2 py-1 hover:rounded-[25px] hover:bg-slate-400";
    const interactionClass = "flex items-center gap-1 rounded-[20px] bg-[#dae0e5] px-4 py-2";
    const isOwner = Boolean(user && data && user.id === data.author_id)

    return (
        <section className="flex min-w-0 flex-[5] flex-col gap-5 text-[1.4rem] md:text-[1.6rem]">
            <header className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <div className="flex min-w-0 items-center gap-2.5">
                    <div>
                        <i className="bi bi-arrow-left cursor-pointer rounded-[30px] bg-slate-400 px-2 py-1.5 text-[1.6rem]"></i>
                    </div>
                    <div className="flex min-w-0 items-center gap-2.5">
                        <img src='/images/communityIcon.jpg' alt='Community Icon' className="h-8 w-8 rounded-full border border-black" />
                        <div className="flex min-w-0 flex-col">
                            <div className="flex min-w-0 flex-wrap gap-1">
                                <span className="cursor-pointer truncate font-bold">r/{data?.community_name}</span>
                                <span>.</span>
                                <span>2hr ago</span>
                            </div>
                            <span className="truncate text-slate-600">{data?.author_username}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end gap-3">
                    {isOwner && (
                        <Button
                            className="rounded-[25px] border-0 bg-[#dae0e5] px-4 py-2"
                            onPress={handleEditPost}
                        >
                            <i className="bi bi-pencil-square mr-2"></i>
                            Edit
                        </Button>
                    )}
                    <i className="bi bi-three-dots cursor-pointer rounded-[30px] bg-slate-400 px-2 py-1.5 text-[1.6rem]"></i>
                </div>
            </header>

            <div>
                <h1 className="break-words text-[2rem] font-bold md:text-[2.4rem]">{data?.title}</h1>
            </div>

            <div className="flex min-w-0 flex-col">
                <div className="mb-3 inline-block w-fit rounded-[15px] px-2 py-1" style={{backgroundColor: `${data?.flair_color}`}}>
                    <span>{data?.flair_title}</span>
                </div>

                <div className="min-w-0 overflow-x-auto break-words" dangerouslySetInnerHTML={{ __html: data?.content_html ?? "" }} />
            </div>

            <div className="flex flex-wrap items-center gap-3 md:gap-5">
                <div className="flex items-center gap-0.5 rounded-[20px] bg-[#dae0e5] px-2 py-2">
                    <Button className={voteButtonClass} aria-label="Upvote post" onPress={()=>handleVoteClick(postId!, 1)} style={{color: data?.vote_status === 'upvoted' ? 'red' : 'black'}}>
                        <i className="bi bi-arrow-up"></i>
                    </Button>
                    <span>{data?.score}</span>
                    <Button className={voteButtonClass} aria-label="Downvote post" onPress={()=>handleVoteClick(postId!, -1)} style={{color: data?.vote_status === 'downvoted' ? 'red' : 'black'}}>
                        <i className="bi bi-arrow-down"></i>
                    </Button>
                </div>

                <div className={interactionClass}>
                    <i className="bi bi-chat-left-text"></i>
                    <span>{data?.comment_count}</span>
                </div>

                <div className={interactionClass}>
                    <i className="bi bi-share"></i>
                    <span>Share</span>
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
