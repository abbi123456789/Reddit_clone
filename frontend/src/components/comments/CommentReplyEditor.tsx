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

const theme = {
    ltr: 'ltr',
    rtl: 'rtl',
    placeholder: 'pointer-events-none absolute top-1 left-0 inline-block select-none overflow-hidden text-ellipsis text-[14px] text-[#999] whitespace-nowrap',
    paragraph: 'relative m-0 mb-2',
    link: 'text-[#216fdb] no-underline hover:cursor-pointer hover:underline',
    text: {
        bold: 'font-bold',
        italic: 'italic',
        overflowed: 'editor-text-overflowed',
        hashtag: 'editor-text-hashtag',
        underline: 'underline',
        strikethrough: 'line-through',
        underlineStrikethrough: 'underline line-through',
        code: 'bg-[#f0f2f5] px-1 py-px font-mono text-[94%]',
    },
};

function Placeholder() {
    return <div className="pointer-events-none absolute top-1 left-0 inline-block select-none overflow-hidden text-ellipsis whitespace-nowrap text-[14px] text-[#999]">What are your thoughts?</div>;
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
            <div className="relative m-0 rounded text-left leading-5 font-normal text-black">
                <div className="relative bg-transparent">
                    <RichTextPlugin
                        contentEditable={<ContentEditable className="relative h-[30px] min-h-[30px] overflow-y-auto py-1 text-[14px] caret-[#444] outline-0 [tab-size:1]" />}
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
