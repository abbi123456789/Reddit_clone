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
    const toolbarButtonClass = "flex cursor-pointer rounded-[10px] border-0 bg-transparent p-2 align-middle hover:bg-[#eee]";

    return (
        <>
            <div className="flex gap-2 border-b border-gray-300 bg-[#f5f5f5] p-2">
                <Button
                    className={toolbarButtonClass}
                    onPress={() => {
                        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
                    }}
                    aria-label="Format Bold"
                    type="button"
                >
                    <i className="bi bi-type-bold"></i>
                </Button>
                <Button
                    className={toolbarButtonClass}
                    onPress={() => {
                        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
                    }}
                    aria-label="Format Italic"
                    type="button"
                >
                    <i className="bi bi-type-italic"></i>
                </Button>
                <Button
                    className={toolbarButtonClass}
                    onPress={() => {
                        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
                    }}
                    aria-label="Format Underline"
                    type="button"
                >
                    <i className="bi bi-type-underline"></i>
                </Button>
                <Button
                    className={toolbarButtonClass}
                    onPress={() => {
                        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
                    }}
                    aria-label="Insert Code Block"
                    type="button"
                >
                    <i className="bi bi-code"></i>
                </Button>
                <div className="mx-1 w-px bg-gray-300" />
                <Button
                    className={toolbarButtonClass}
                    onPress={() => {
                        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
                    }}
                    aria-label="Bullet List"
                    type="button"
                >
                    <i className="bi bi-list-ul"></i>
                </Button>
                <Button
                    className={toolbarButtonClass}
                    onPress={() => {
                        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
                    }}
                    aria-label="Numbered List"
                    type="button"
                >
                    <i className="bi bi-list-ol"></i>
                </Button>
                <div className="mx-1 w-px bg-gray-300" />
                <Button
                    className={toolbarButtonClass}
                    onPress={() => setIsModalOpen(true)}
                    aria-label="Insert Image"
                    type="button"
                >
                    <i className="bi bi-image"></i>
                </Button>

                <div className="grow" />

                <Button className={toolbarButtonClass} aria-label="Undo" onPress={() => editor.dispatchCommand(UNDO_COMMAND, undefined)} type="button">
                    <i className="bi bi-arrow-counterclockwise"></i>
                </Button>
                <Button className={toolbarButtonClass} aria-label="Redo" onPress={() => editor.dispatchCommand(REDO_COMMAND, undefined)} type="button">
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
