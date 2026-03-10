import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INSERT_UNORDERED_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND } from '@lexical/list';
import { FORMAT_TEXT_COMMAND, UNDO_COMMAND, REDO_COMMAND } from 'lexical';
import { useState } from 'react';
import { InsertImageDialog } from './ImagePlugin';
import Modal from '../ui/Modal';

const ToolbarPlugin = () => {
    const [editor] = useLexicalComposerContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="toolbar" style={{ display: 'flex', gap: '8px', padding: '8px', borderBottom: '1px solid #ccc', background: '#f5f5f5' }}>
                <button
                    onClick={() => {
                        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
                    }}
                    aria-label="Format Bold"
                    type="button"
                >
                    <i className="bi bi-type-bold"></i>
                </button>
                <button
                    onClick={() => {
                        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
                    }}
                    aria-label="Format Italic"
                    type="button"
                >
                    <i className="bi bi-type-italic"></i>
                </button>
                <button
                    onClick={() => {
                        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
                    }}
                    aria-label="Format Underline"
                    type="button"
                >
                    <i className="bi bi-type-underline"></i>
                </button>
                <button
                    onClick={() => {
                        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
                    }}
                    aria-label="Insert Code Block"
                    type="button"
                >
                    <i className="bi bi-code"></i>
                </button>
                <div style={{ width: '1px', backgroundColor: '#ccc', margin: '0 4px' }} />
                <button
                    onClick={() => {
                        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
                    }}
                    aria-label="Bullet List"
                    type="button"
                >
                    <i className="bi bi-list-ul"></i>
                </button>
                <button
                    onClick={() => {
                        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
                    }}
                    aria-label="Numbered List"
                    type="button"
                >
                    <i className="bi bi-list-ol"></i>
                </button>
                <div style={{ width: '1px', backgroundColor: '#ccc', margin: '0 4px' }} />
                <button
                    onClick={() => setIsModalOpen(true)}
                    aria-label="Insert Image"
                    type="button"
                >
                    <i className="bi bi-image"></i>
                </button>

                <div style={{ flexGrow: 1 }} />

                <button onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)} type="button">
                    <i className="bi bi-arrow-counterclockwise"></i>
                </button>
                <button onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)} type="button">
                    <i className="bi bi-arrow-clockwise"></i>
                </button>
            </div>
            {isModalOpen && (
                <Modal title="Insert Image" onClose={() => setIsModalOpen(false)}>
                    <InsertImageDialog activeEditor={editor} onClose={() => setIsModalOpen(false)} />
                </Modal>
            )}
        </>
    );
};

export default ToolbarPlugin;
