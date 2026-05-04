import CommentEditor from './CommentEditor';
import '../../styles/commentinput.css'
import type { EditorState } from 'lexical';
import { Button } from 'react-aria-components';

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
        <Button className = 'inactive-comment-input' onPress={()=>setIsActive(true)}>
            <span className='placeholder'>Join the conversation</span>
        </Button>
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
                <Button
                    className = 'cancel-button'
                    onPress = {()=>handleCancel()}
                >
                    Cancel
                </Button>
                <Button
                    className = 'save-button'
                    onPress={()=>onSave()}
                >
                    Save
                </Button>
            </div>
        </div>
    )
}

export default CommentInput;
