import { useState } from 'react'
import type { CommentNode } from "../../utils/buildCommentTree"
import { getCommentById, type PostComment } from "../../services/comments"
import '../../styles/comments.css'
import { voteComment } from "../../services/vote"
import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query'
import { useParams } from "react-router-dom"
import { updateScore } from "../../utils/updateScore"
import CommentReplyInput from "./CommentReplyInput"
import { Button } from "react-aria-components"

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
            <div className='comment'>
                {hasChildren && (
                    <Button
                        aria-label={isCollapsed ? 'Expand replies' : 'Collapse replies'}
                        onPress={() => setIsCollapsed(p => !p)}
                        style={{
                        width: 2,
                        background: 'black',   // optional: rotate colors per depth
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

                <div style={{flex: 1}}>
                    <div className='comment-author'>
                        <span>{commentData?.author_name}</span>
                    </div>
                    <div className='comment-content' dangerouslySetInnerHTML={{ __html: commentData?.content_html }} />
                    <div className='comment-interactions'>
                        <div className='comment-score'>
                            <Button className='vote-button' aria-label="Upvote comment" onPress={()=>handleVoteClick(commentData?.id, 1)} style={{color: commentData?.vote_status === 'upvoted' ? 'red' : 'black'}}>
                                <i className='bi bi-arrow-up'></i>
                            </Button>
                            <span>{commentData?.score}</span>
                            <Button className='vote-button' aria-label="Downvote comment" onPress={()=>handleVoteClick(commentData?.id, -1)} style={{color: commentData?.vote_status === 'downvoted' ? 'red' : 'black'}}>
                                <i className='bi bi-arrow-down'></i>
                            </Button>
                        </div>

                        <Button className='comment-reply' onPress={handleReplyClick}>
                            <i className="bi bi-chat-left-text comment-icon"></i>
                            <span>Reply</span>
                        </Button>

                        <div className='comment-share'>
                            <i className='bi bi-share share-icon'></i>
                            <span>share</span>
                        </div>
                    </div>
                </div>
                {!isCollapsed && commentData?.children && commentData.children.length > 0 && (
                    <div className='comment-children'>
                        {commentData.children.map(child => (
                            <CommentCard key={child.id} comment={child} depth={depth + 1} activeReplyCommentId={activeReplyCommentId} onReply={onReply}/>
                        ))}
                    </div>
                )}
                {isReplying && (
                    <div className='comment-reply-input'>
                        <CommentReplyInput parentId={comment.id} onReply={onReply}/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentCard
