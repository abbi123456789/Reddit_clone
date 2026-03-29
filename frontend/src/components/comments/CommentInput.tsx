import { useState } from 'react';
import CommentEditor from './CommentEditor';
import '../../styles/commentinput.css'

export type CommentInputProps = {
    setCommentJSON: (value: string) => void;
    setCommentHTML: (value: string) => void;
    onSave: () => void;
}

export type ActiveCommentInputProps = {
    setCommentJSON: (value: string) => void;
    setCommentHTML: (value: string) => void;
    onSave: () => void;
    setIsActive: (value: boolean) => void;
}


const CommentInput = ({ setCommentJSON, setCommentHTML, onSave }: CommentInputProps) => {
    const [isActive, setIsActive] = useState(false)
    return (
        <div className="comment-input-container">
            {isActive ? 
                <ActiveCommentInput setCommentJSON={setCommentJSON} setCommentHTML={setCommentHTML} onSave={onSave} setIsActive={setIsActive} /> 
                : 
                <InactiveCommentInput setIsActive={setIsActive}/>
            }
        </div>
    );
};


const InactiveCommentInput = ({ setIsActive }: { setIsActive: (value: boolean) => void }) => {
    return (
        <div className = 'inactive-comment-input' onClick={()=>setIsActive(true)}>
            <span className='placeholder'>Join the conversation</span>
        </div>
    )
}

const ActiveCommentInput = ({ setCommentJSON, setCommentHTML, onSave, setIsActive }: ActiveCommentInputProps) => {
    const handleEditorChange = (editorState: any, html: string) => {
        const json = editorState.toJSON();
        setCommentJSON(JSON.stringify(json));
        setCommentHTML(html);
    }

    const handleCancel = () => {
        setIsActive(false);
        setCommentJSON('');
        setCommentHTML('');
    }

    return (
        <div className='active-comment-input'>
            <CommentEditor onChange={handleEditorChange} />
            <div className="comment-actions">
                <button
                    className = 'cancel-button'
                    onClick = {()=>handleCancel()}
                >
                    Cancel
                </button>
                <button
                    className = 'save-button'
                    onClick={()=>onSave()}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default CommentInput;
