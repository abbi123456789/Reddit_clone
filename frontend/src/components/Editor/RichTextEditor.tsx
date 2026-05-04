import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';

import ToolbarPlugin from './plugins/ToolbarPlugin';
import RedditAutoLinkPlugin from './plugins/RedditAutoLinkPlugin';
import ImagePlugin from './plugins/ImagePlugin';
import { ImageNode } from './nodes/ImageNode';

import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import type { EditorState, LexicalEditor } from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';

const theme = {
    ltr: 'ltr',
    rtl: 'rtl',
    placeholder: 'pointer-events-none absolute top-[15px] left-2.5 inline-block select-none overflow-hidden text-ellipsis text-[15px] text-[#999]',
    paragraph: 'relative m-0 mb-2',
    quote: 'm-0 ml-5 border-l-4 border-solid border-l-[#ced0d4] pl-4 text-[15px] text-[#65676b]',
    heading: {
        h1: 'm-0 mb-3 p-0 text-[24px] font-normal text-[#050505]',
        h2: 'm-0 mt-2.5 p-0 text-[18px] font-bold text-[#65676b]',
        h3: 'm-0 mt-2.5 p-0 text-[14px] font-bold uppercase text-[#65676b]',
    },
    list: {
        nested: {
            listitem: 'list-none',
        },
        ol: 'm-0 ml-4 p-0',
        ul: 'm-0 ml-4 p-0',
        listitem: 'mx-8 my-2',
        listitemChecked: 'editor-listitem-checked',
        listitemUnchecked: 'editor-listitem-unchecked',
    },
    image: 'relative inline-block cursor-default select-none [&_img]:max-w-full [&_img.focused]:outline-2 [&_img.focused]:outline-[#3c84f4]',
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
    code: 'relative my-2 block overflow-x-auto bg-[#f0f2f5] py-2 pr-2 pl-[52px] font-mono text-[13px] leading-[1.53] [tab-size:2] before:absolute before:top-0 before:left-0 before:min-w-[25px] before:border-r before:border-gray-300 before:bg-[#eee] before:p-2 before:text-right before:whitespace-pre-wrap before:text-[#777] before:content-[attr(data-gutter)]',
    codeHighlight: {
        atrule: 'editor-tokenAttr',
        attr: 'editor-tokenAttr',
        boolean: 'editor-tokenProperty',
        builtin: 'editor-tokenSelector',
        cdata: 'editor-tokenComment',
        char: 'editor-tokenSelector',
        class: 'editor-tokenFunction',
        'class-name': 'editor-tokenFunction',
        comment: 'editor-tokenComment',
        constant: 'editor-tokenProperty',
        deleted: 'editor-tokenProperty',
        doctype: 'editor-tokenComment',
        entity: 'editor-tokenOperator',
        function: 'editor-tokenFunction',
        important: 'editor-tokenVariable',
        inserted: 'editor-tokenSelector',
        keyword: 'editor-tokenAttr',
        namespace: 'editor-tokenVariable',
        number: 'editor-tokenProperty',
        operator: 'editor-tokenOperator',
        prolog: 'editor-tokenComment',
        property: 'editor-tokenProperty',
        punctuation: 'editor-tokenPunctuation',
        regex: 'editor-tokenVariable',
        selector: 'editor-tokenSelector',
        string: 'editor-tokenSelector',
        symbol: 'editor-tokenProperty',
        tag: 'editor-tokenProperty',
        url: 'editor-tokenOperator',
        variable: 'editor-tokenVariable',
    },
};

function Placeholder() {
    return <div className="pointer-events-none absolute top-[15px] left-2.5 inline-block select-none overflow-hidden text-ellipsis text-[15px] text-[#999]">What are your thoughts?</div>;
}

const editorConfig = {
    namespace: 'lexical',
    // The editor theme
    theme,
    // Handling of errors during update
    onError(error: Error) {
        throw error;
    },
    // Any custom nodes go here
    nodes: [
        HeadingNode,
        ListNode,
        ListItemNode,
        QuoteNode,
        CodeNode,
        CodeHighlightNode,
        TableNode,
        TableCellNode,
        TableRowNode,
        AutoLinkNode,
        LinkNode,
        ImageNode,
    ],
};

export interface RichTextEditorProps {
    onChange?: (editorState: EditorState, html: string) => void;
}

const RichTextEditor = ({ onChange }: RichTextEditorProps) => {
    const handleChange = (editorState: EditorState, editor: LexicalEditor) => {
        if (!onChange) return;

        editorState.read(() => {
            const html = $generateHtmlFromNodes(editor, null);
            onChange(editorState, html);
        });
    };

    return (
        <LexicalComposer initialConfig={editorConfig}>
            <div className="relative mx-auto my-5 rounded-t-[10px] rounded-b-lg border border-gray-300 bg-white text-left leading-5 font-normal text-black">
                <ToolbarPlugin />
                <div className="relative bg-white">
                    <RichTextPlugin
                        contentEditable={<ContentEditable className="relative min-h-[150px] resize-y p-[15px_10px] text-[15px] caret-[#444] outline-0 [tab-size:1]" />}
                        placeholder={<Placeholder />}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <HistoryPlugin />
                    <AutoFocusPlugin />
                    <ListPlugin />
                    <LinkPlugin />
                    <RedditAutoLinkPlugin />
                    <ImagePlugin />
                    <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
                    <OnChangePlugin onChange={handleChange} />
                </div>
            </div>
        </LexicalComposer>
    );
};

export default RichTextEditor;
