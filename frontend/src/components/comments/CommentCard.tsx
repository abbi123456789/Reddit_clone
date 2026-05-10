import { useState } from 'react'
import type { CommentNode } from "../../utils/buildCommentTree"
import { getCommentById, type PostComment } from "../../services/comments"
import { voteComment } from "../../services/vote"
import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query'
import { useParams } from "react-router-dom"
import { updateScore } from "../../utils/updateScore"
import CommentReplyInput from "./CommentReplyInput"
import { Button } from "react-aria-components"
import { voteButtonClass } from "../../styles/theme"

type CommentCardProps = {
    comment: CommentNode
    depth: number
    activeReplyCommentId: number | null
    onReply: (commentId: number | null) => void
}

const CommentCard = ({comment, depth=0, activeReplyCommentId, onReply}:CommentCardProps) => {
    const {postId} = useParams()
    const queryClient = useQueryClient()
    const [isCollapsed, setIsCollapsed] = useState(false)
    const isReplying = activeReplyCommentId === comment.id
    
    const { data:commentData } = useQuery({
        queryKey: ['comment', comment.id],
        queryFn: async () => await getCommentById(comment.id),
        initialData: comment,
        staleTime: 5 * 60 * 1000,
    })

    const hasChildren = commentData?.children && commentData.children.length > 0

    const commentVoteMutation = useMutation({
        mutationFn: voteComment,
        onMutate: (variables) => {
            const {commentId, value} = variables

            const previousComment = queryClient.getQueryData(['comment', commentId]) as PostComment 

            queryClient.setQueryData(['comment', commentId], {
                ...previousComment,
                ...updateScore(previousComment.score, value, previousComment.vote_status)
            })
            return {previousComment}
        },
        onError: (_, variables, context) => {
            queryClient.setQueryData(['comment', variables.commentId], context?.previousComment)
            queryClient.invalidateQueries({queryKey: ['comments', postId]})
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['comments', postId]})
        }
    })

    const handleVoteClick = async (commentId:number, value: 1 | -1) => {
        commentVoteMutation.mutate({commentId, value})
    }

    const handleReplyClick = () => {
        onReply(comment.id)
    }

    return (
        <div style={{ paddingLeft: depth * 16 }}>
            <div className="flex flex-col gap-2.5">
                {hasChildren && (
                    <Button
                        aria-label={isCollapsed ? 'Expand replies' : 'Collapse replies'}
                        onPress={() => setIsCollapsed(p => !p)}
                        style={{
                        width: 2,
                        background: '#ea580c',
                        borderRadius: 2,
                        cursor: 'pointer',
                        flexShrink: 0,
                        minHeight: '100%',
                        alignSelf: 'stretch',
                        border: 0,
                        padding: 0,
                        }}
                    />
                )}

                <div className="flex-1">
                    <div className="text-[1.2rem] font-bold">
                        <span>{commentData?.author_name}</span>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: commentData?.content_html }} />
                    <div className="flex items-center gap-5">
                        <div className="flex cursor-pointer items-center gap-0.5">
                            <Button className={voteButtonClass} aria-label="Upvote comment" onPress={()=>handleVoteClick(commentData?.id, 1)} style={{color: commentData?.vote_status === 'upvoted' ? 'red' : 'black'}}>
                                <i className='bi bi-arrow-up'></i>
                            </Button>
                            <span>{commentData?.score}</span>
                            <Button className={voteButtonClass} aria-label="Downvote comment" onPress={()=>handleVoteClick(commentData?.id, -1)} style={{color: commentData?.vote_status === 'downvoted' ? 'red' : 'black'}}>
                                <i className='bi bi-arrow-down'></i>
                            </Button>
                        </div>

                        <Button className="flex cursor-pointer items-center gap-2 rounded-full border-0 bg-transparent p-1 transition-colors hover:bg-orange-50 hover:text-orange-700" onPress={handleReplyClick}>
                            <i className="bi bi-chat-left-text"></i>
                            <span>Reply</span>
                        </Button>

                        <div className="flex cursor-pointer gap-2 rounded-full p-1 transition-colors hover:bg-orange-50 hover:text-orange-700">
                            <i className='bi bi-share'></i>
                            <span>share</span>
                        </div>
                    </div>
                </div>
                {!isCollapsed && commentData?.children && commentData.children.length > 0 && (
                    <div>
                        {commentData.children.map(child => (
                            <CommentCard key={child.id} comment={child} depth={depth + 1} activeReplyCommentId={activeReplyCommentId} onReply={onReply}/>
                        ))}
                    </div>
                )}
                {isReplying && (
                    <div>
                        <CommentReplyInput parentId={comment.id} onReply={onReply}/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentCard
