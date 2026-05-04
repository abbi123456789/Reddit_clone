import CommentReplyEditor from './CommentReplyEditor';
import { useState } from 'react';
import { createComment } from '../../services/comments';
import type { CommentBody } from '../../services/comments';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Button } from 'react-aria-components';

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
        <div className="w-full rounded-[20px] border border-gray-300 text-[1.4rem]">
            <div className="p-2.5">
                <CommentReplyEditor 
                    setCommentReplyJSON={setCommentReplyJSON} 
                    setCommentReplyHTML={setCommentReplyHTML} 
                />
                <div className="mt-3 flex justify-end gap-2">
                    <Button
                        className="rounded-[15px] border-0 bg-[#f5f5f5] px-4 py-1.5 font-bold"
                        onPress = {()=>handleCancel()}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="rounded-[15px] border-0 bg-[#0079d3] px-4 py-1.5 font-bold text-white"
                        onPress={()=>handleSave()}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CommentInput;
