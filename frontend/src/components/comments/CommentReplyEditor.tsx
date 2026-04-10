import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TEXT_FORMAT_TRANSFORMERS, TEXT_MATCH_TRANSFORMERS } from '@lexical/markdown';

import RedditAutoLinkPlugin from '../Editor/plugins/RedditAutoLinkPlugin';

import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import type { EditorState, LexicalEditor } from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';

import '../../styles/comment-editor.css';

const theme = {
    ltr: 'ltr',
    rtl: 'rtl',
    placeholder: 'comment-editor-placeholder',
    paragraph: 'editor-paragraph',
    link: 'editor-link',
    text: {
        bold: 'editor-text-bold',
        italic: 'editor-text-italic',
        overflowed: 'editor-text-overflowed',
        hashtag: 'editor-text-hashtag',
        underline: 'editor-text-underline',
        strikethrough: 'editor-text-strikethrough',
        underlineStrikethrough: 'editor-text-underlineStrikethrough',
        code: 'editor-text-code',
    },
};

function Placeholder() {
    return <div className="comment-editor-placeholder">What are your thoughts?</div>;
}

const editorConfig = {
    namespace: 'comment-editor',
    theme,
    onError(error: Error) {
        throw error;
    },
    nodes: [
        AutoLinkNode,
        LinkNode,
    ],
};

export interface CommentReplyEditorProps {
    setCommentReplyJSON: (json: string) => void;
    setCommentReplyHTML: (html: string) => void;
}

const CommentReplyEditor = ({ setCommentReplyJSON, setCommentReplyHTML }: CommentReplyEditorProps) => {
    const handleChange = (editorState: EditorState, editor: LexicalEditor) => {
        editorState.read(() => {
            const html = $generateHtmlFromNodes(editor, null);
            setCommentReplyHTML(html);
            setCommentReplyJSON(JSON.stringify(editorState.toJSON()));
        });
    };

    return (
        <LexicalComposer initialConfig={editorConfig}>
            <div className="comment-editor-container">
                <div className="comment-editor-inner">
                    <RichTextPlugin
                        contentEditable={<ContentEditable className="comment-editor-input" />}
                        placeholder={<Placeholder />}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <HistoryPlugin />
                    <LinkPlugin />
                    <RedditAutoLinkPlugin />
                    <MarkdownShortcutPlugin transformers={[...TEXT_FORMAT_TRANSFORMERS, ...TEXT_MATCH_TRANSFORMERS]} />
                    <OnChangePlugin onChange={handleChange} />
                </div>
            </div>
        </LexicalComposer>
    );
};

export default CommentReplyEditor;
