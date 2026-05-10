import React from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
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
import { actionPillClass, iconButtonClass, subtleButtonClass, voteButtonClass, votePillClass } from "../../styles/theme"

const PostBody = ()=>{
    const navigate = useNavigate()
    const { communityName, postId, postSlug } = useParams()
    const [commentJSON, setCommentJSON] = useState<string>('')
    const [commentHTML, setCommentHTML] = useState<string>('')
    // To check, if the comment input box is active or not, when user clicks on it, it becomes active and shows the comment editor, otherwise it shows the placeholder text
    const [isActive, setIsActive] = useState(false)
    const { isAuthenticated, user } = useAuth()

    const [currentMediaIndex, setCurrentMediaIndex] = useState(0)

    const queryClient = useQueryClient()

    const {data} = useQuery({
        queryKey: ['post', postSlug],
        queryFn: async () => await getPostBySlug(postId!, postSlug!),
        select: (data) => {
            return {
                ...data,
                media_urls: data.media_urls ? JSON.parse(data.media_urls as string) : [],}
        }
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

    const isOwner = Boolean(user && data && user.id === data.author_id)

    return (
        <section className="flex min-w-0 flex-[5] flex-col gap-5 text-[1.4rem] md:text-[1.6rem]">
            <header className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <div className="flex min-w-0 items-center gap-2.5">
                    <div>
                        <i className={`${iconButtonClass} bi bi-arrow-left cursor-pointer text-[1.6rem]`}></i>
                    </div>
                    <div className="flex min-w-0 items-center gap-2.5">
                        <img src='/images/communityIcon.jpg' alt='Community Icon' className="h-8 w-8 rounded-full border border-black" />
                        <div className="flex min-w-0 flex-col">
                            <div className="flex min-w-0 flex-wrap gap-1">
                                <span className="cursor-pointer truncate font-bold">
                                    <Link to={`/r/${data?.community_name}`} className="text-inherit">
                                        r/{data?.community_name}
                                    </Link>
                                </span>
                                <span>.</span>
                                <span>2hr ago</span>
                            </div>
                            <span className="truncate text-slate-600">
                                <Link to={`/u/${data?.author_username}`} className="text-inherit">
                                    {data?.author_username}
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end gap-3">
                    {isOwner && (
                        <Button
                            className={subtleButtonClass}
                            onPress={handleEditPost}
                        >
                            <i className="bi bi-pencil-square mr-2"></i>
                            Edit
                        </Button>
                    )}
                    <i className={`${iconButtonClass} bi bi-three-dots cursor-pointer text-[1.6rem]`}></i>
                </div>
            </header>

            <div>
                <h1 className="break-words text-[2rem] font-bold md:text-[2.4rem]">{data?.title}</h1>
            </div>

            <div className="flex min-w-0 flex-col">
                {data?.flair_title && (
                    <div
                        className="mb-3 inline-block w-fit rounded-[15px] px-2 py-1"
                        style={{ backgroundColor: `${data?.flair_color}` }}
                    >
                        <span>{data?.flair_title}</span>
                    </div>
                )}

            {/* MEDIA POST */}
            {data?.post_type === "media" &&
                Array.isArray(data?.media_urls) &&
                data.media_urls.length > 0 && (
                    <div className="relative overflow-hidden rounded-[20px] bg-black">
                        {(() => {
                            const mediaUrl = data.media_urls[currentMediaIndex]

                            const isVideo =
                                mediaUrl.endsWith(".mp4") ||
                                mediaUrl.endsWith(".webm") ||
                                mediaUrl.endsWith(".mov")

                            return isVideo ? (
                                <video
                                    src={mediaUrl}
                                    controls
                                    className="max-h-[700px] w-full object-contain"
                                />
                            ) : (
                                <img
                                    src={mediaUrl}
                                    alt={`Post media ${currentMediaIndex + 1}`}
                                    className="max-h-[700px] w-full object-contain"
                                />
                            )
                        })()}

                        {data.media_urls.length > 1 && (
                            <>
                                <Button
                                    aria-label="Previous media"
                                    className="absolute top-1/2 left-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-0 bg-white/80 text-black hover:bg-white"
                                    onPress={() =>
                                        setCurrentMediaIndex((prev) =>
                                            prev === 0 ? data.media_urls.length - 1 : prev - 1
                                        )
                                    }
                                >
                                    <i className="bi bi-chevron-left"></i>
                                </Button>

                                <Button
                                    aria-label="Next media"
                                    className="absolute top-1/2 right-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-0 bg-white/80 text-black hover:bg-white"
                                    onPress={() =>
                                        setCurrentMediaIndex((prev) =>
                                            prev === data.media_urls.length - 1 ? 0 : prev + 1
                                        )
                                    }
                                >
                                    <i className="bi bi-chevron-right"></i>
                                </Button>

                                <div className="absolute bottom-4 left-1/2 rounded-full bg-black/60 px-3 py-1 text-sm text-white -translate-x-1/2">
                                    {currentMediaIndex + 1} / {data.media_urls.length}
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* LINK POST */}
                {data?.post_type === "link" && data?.link_url && (
                    <a
                        href={data.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-[20px] border border-slate-300 p-4 transition hover:bg-slate-100"
                    >
                        <div className="flex items-center gap-3">
                            <i className="bi bi-link-45deg text-[2rem]"></i>

                            <div className="min-w-0">
                                <p className="truncate font-semibold">
                                    {data.link_url}
                                </p>

                                <p className="text-sm text-slate-500">
                                    Open external link
                                </p>
                            </div>
                        </div>
                    </a>
                )}
                <div
                    className="min-w-0 overflow-x-auto break-words"
                    dangerouslySetInnerHTML={{ __html: data?.content_html ?? "" }}
                />
            </div>

            <div className="flex flex-wrap items-center gap-3 md:gap-5">
                <div className={votePillClass}>
                    <Button className={voteButtonClass} aria-label="Upvote post" onPress={()=>handleVoteClick(postId!, 1)} style={{color: data?.vote_status === 'upvoted' ? 'red' : 'black'}}>
                        <i className="bi bi-arrow-up"></i>
                    </Button>
                    <span>{data?.score}</span>
                    <Button className={voteButtonClass} aria-label="Downvote post" onPress={()=>handleVoteClick(postId!, -1)} style={{color: data?.vote_status === 'downvoted' ? 'red' : 'black'}}>
                        <i className="bi bi-arrow-down"></i>
                    </Button>
                </div>

                <div className={actionPillClass}>
                    <i className="bi bi-chat-left-text"></i>
                    <span>{data?.comment_count}</span>
                </div>

                <div className={actionPillClass}>
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
