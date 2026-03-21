import CommentEditor from './CommentEditor';

export type CommentInputProps = {
    setCommentJSON: (value: string) => void;
    setCommentHTML: (value: string) => void;
    onSave: () => void;
}

const CommentInput = ({ setCommentJSON, setCommentHTML, onSave }: CommentInputProps) => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEditorChange = (editorState: any, html: string) => {
        const json = editorState.toJSON();
        setCommentJSON(JSON.stringify(json));
        setCommentHTML(html);
    }

    return (
        <div className="comment-input-container" style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '12px', marginTop: '16px' }}>
            <CommentEditor onChange={handleEditorChange} />
            <div className="comment-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
                <button
                    style={{ padding: '6px 16px', borderRadius: '15px', border: 'none', cursor: 'pointer', background: '#f5f5f5', fontWeight: 'bold' }}
                >
                    Cancel
                </button>
                <button
                    onClick={()=>onSave()}
                    style={{ padding: '6px 16px', borderRadius: '15px', border: 'none', cursor: 'pointer', background: '#0079D3', color: 'white', fontWeight: 'bold' }}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default CommentInput;
