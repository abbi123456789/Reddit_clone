import CommentEditor from './CommentEditor';
import type { EditorState } from 'lexical';
import { Button } from 'react-aria-components';
import { primaryButtonClass, secondaryButtonClass } from '../../styles/theme';

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
        <div className="w-full rounded-[20px] border border-slate-200 bg-white text-[1.4rem]">
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
        <Button className="flex h-full w-full items-center border-0 bg-transparent py-2.5 text-left" onPress={()=>setIsActive(true)}>
            <span className="ml-3 text-[#888]">Join the conversation</span>
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
        <div className="p-2.5">
            <CommentEditor onChange={handleEditorChange} />
            <div className="mt-3 flex justify-end gap-2">
                <Button
                    className={`${secondaryButtonClass} px-4 py-1.5`}
                    onPress = {()=>handleCancel()}
                >
                    Cancel
                </Button>
                <Button
                    className={`${primaryButtonClass} px-4 py-1.5`}
                    onPress={()=>onSave()}
                >
                    Save
                </Button>
            </div>
        </div>
    )
}

export default CommentInput;
