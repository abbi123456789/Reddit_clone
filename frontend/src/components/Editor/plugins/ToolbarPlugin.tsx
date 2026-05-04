import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INSERT_UNORDERED_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND } from '@lexical/list';
import { FORMAT_TEXT_COMMAND, UNDO_COMMAND, REDO_COMMAND } from 'lexical';
import { useState } from 'react';
import { Button } from 'react-aria-components';
import { InsertImageDialog } from './ImagePlugin';
import Modal from '../ui/Modal';

const ToolbarPlugin = () => {
    const [editor] = useLexicalComposerContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="toolbar" style={{ display: 'flex', gap: '8px', padding: '8px', borderBottom: '1px solid #ccc', background: '#f5f5f5' }}>
                <Button
                    onPress={() => {
                        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
                    }}
                    aria-label="Format Bold"
                    type="button"
                >
                    <i className="bi bi-type-bold"></i>
                </Button>
                <Button
                    onPress={() => {
                        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
                    }}
                    aria-label="Format Italic"
                    type="button"
                >
                    <i className="bi bi-type-italic"></i>
                </Button>
                <Button
                    onPress={() => {
                        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
                    }}
                    aria-label="Format Underline"
                    type="button"
                >
                    <i className="bi bi-type-underline"></i>
                </Button>
                <Button
                    onPress={() => {
                        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
                    }}
                    aria-label="Insert Code Block"
                    type="button"
                >
                    <i className="bi bi-code"></i>
                </Button>
                <div style={{ width: '1px', backgroundColor: '#ccc', margin: '0 4px' }} />
                <Button
                    onPress={() => {
                        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
                    }}
                    aria-label="Bullet List"
                    type="button"
                >
                    <i className="bi bi-list-ul"></i>
                </Button>
                <Button
                    onPress={() => {
                        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
                    }}
                    aria-label="Numbered List"
                    type="button"
                >
                    <i className="bi bi-list-ol"></i>
                </Button>
                <div style={{ width: '1px', backgroundColor: '#ccc', margin: '0 4px' }} />
                <Button
                    onPress={() => setIsModalOpen(true)}
                    aria-label="Insert Image"
                    type="button"
                >
                    <i className="bi bi-image"></i>
                </Button>

                <div style={{ flexGrow: 1 }} />

                <Button aria-label="Undo" onPress={() => editor.dispatchCommand(UNDO_COMMAND, undefined)} type="button">
                    <i className="bi bi-arrow-counterclockwise"></i>
                </Button>
                <Button aria-label="Redo" onPress={() => editor.dispatchCommand(REDO_COMMAND, undefined)} type="button">
                    <i className="bi bi-arrow-clockwise"></i>
                </Button>
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
