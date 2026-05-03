import CommentEditor from './CommentEditor';
import '../../styles/commentinput.css'
import type { EditorState } from 'lexical';

export type CommentInputProps = {
    setCommentJSON: (value: string) => void;
    setCommentHTML: (value: string) => void;
    onSave: () => void;
    isActive: boolean;
    setIsActive: (value: boolean) => void;
}

export type ActiveCommentInputProps = {
    setCommentJSON: (value: string) => void;
    setCommentHTML: (value: string) => void;
    onSave: () => void;
    setIsActive: (value: boolean) => void;
}


const CommentInput = ({ setCommentJSON, setCommentHTML, onSave, isActive, setIsActive }: CommentInputProps) => {
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
    const handleEditorChange = (editorState: EditorState, html: string) => {
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
