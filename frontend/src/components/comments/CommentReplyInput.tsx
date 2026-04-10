import CommentReplyEditor from './CommentReplyEditor';
import '../../styles/commentinput.css'
import { useState } from 'react';
import { createComment } from '../../services/comments';
import type { CommentBody } from '../../services/comments';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export type CommentReplyInputProps = {
    onReply: (commentId: number | null) => void;
    parentId: number;
}


const CommentInput = ({onReply, parentId}: CommentReplyInputProps) => {
    const {postId, communityName} = useParams()
    const [commentReplyJSON, setCommentReplyJSON] = useState('')
    const [commentReplyHTML, setCommentReplyHTML] = useState('')

    const queryClient = useQueryClient()

    const commentCreationMutation = useMutation({
        mutationFn: createComment,
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['comments', postId]})
        }
    })

    const handleCancel = () => {
        setCommentReplyJSON('')
        setCommentReplyHTML('')
        onReply(null)
    }

    const handleSave = () => {
        // Implementation for saving the comment reply goes here. This might involve making an API call to save the reply to the backend.
        const commentBody: CommentBody = {
            content_json: JSON.parse(commentReplyJSON),
            content_html: commentReplyHTML,
            post: parseInt(postId!),
            parent: parentId,
            community_name: communityName!,
        }
        
        commentCreationMutation.mutate(commentBody)
        setCommentReplyHTML('')
        setCommentReplyJSON('')
        onReply(null)
    }

    return (
        <div className="comment-input-container">
            <div className='active-comment-input'>
                <CommentReplyEditor 
                    setCommentReplyJSON={setCommentReplyJSON} 
                    setCommentReplyHTML={setCommentReplyHTML} 
                />
                <div className="comment-actions">
                    <button
                        className = 'cancel-button'
                        onClick = {()=>handleCancel()}
                    >
                        Cancel
                    </button>
                    <button
                        className = 'save-button'
                        onClick={()=>handleSave()}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentInput;
