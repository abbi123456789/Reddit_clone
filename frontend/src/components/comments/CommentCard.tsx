import type { PostComment } from "../../services/comments"
import { getCommentById } from "../../services/comments"
import '../../styles/comments.css'
import { voteComment } from "../../services/vote"
import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query'
import { useParams } from "react-router-dom"
import { updateScore } from "../../utils/updateScore"

type CommentCardProps = {
    comment: PostComment
}

const CommentCard = ({comment} :CommentCardProps) => {
    const {postId} = useParams()
    const queryClient = useQueryClient()

    const {data:commentData, isError, isPending} = useQuery({
        queryKey: ['comment', comment.id],
        queryFn: async () => await getCommentById(comment.id),
        initialData: comment,
        staleTime: 5 * 60 * 1000,
    })

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
        onError: (err, variables, context) => {
            const queryClient = useQueryClient()
            queryClient.setQueryData(['comment', variables.commentId], context?.previousComment)
            queryClient.invalidateQueries({queryKey: ['comments', postId]})
        },
        onSettled: () => {
            const queryClient = useQueryClient()
            queryClient.invalidateQueries({queryKey: ['comments', postId]})
        }
    })

    const handleVoteClick = async (commentId:number, value: 1 | -1) => {
        commentVoteMutation.mutate({commentId, value})
    }

    return (
        <div className='comment'>
            <div className='comment-author'>
                <span>{commentData?.author_name}</span>
            </div>
            <div className='comment-content' dangerouslySetInnerHTML={{ __html: commentData?.content_html }} />
            <div className='comment-interactions'>
                <div className='comment-score'>
                    <i className='bi bi-arrow-up vote-button' onClick={()=>handleVoteClick(commentData?.id, 1)} style={{color: commentData?.vote_status === 'upvoted' ? 'red' : 'black'}}></i>
                    <span>{commentData?.score}</span>
                    <i className='bi bi-arrow-down vote-button' onClick={()=>handleVoteClick(commentData?.id, -1)} style={{color: commentData?.vote_status === 'downvoted' ? 'red' : 'black'}}></i>
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

export default CommentCard