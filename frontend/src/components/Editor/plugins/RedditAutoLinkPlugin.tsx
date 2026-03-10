import { AutoLinkPlugin, createLinkMatcherWithRegExp } from '@lexical/react/LexicalAutoLinkPlugin';

const SUBREDDIT_REGEX = /r\/[a-zA-Z0-9_]+/i;
const USER_REGEX = /u\/[a-zA-Z0-9_]+/i;
const URL_REGEX = /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const MATCHERS = [
    createLinkMatcherWithRegExp(URL_REGEX, (text) => {
        return text.startsWith('http') ? text : `https://${text}`;
    }),
    createLinkMatcherWithRegExp(SUBREDDIT_REGEX, (text) => {
        return `/${text}`;
    }),
    createLinkMatcherWithRegExp(USER_REGEX, (text) => {
        return `/${text}`;
    }),
];

const RedditAutoLinkPlugin = () => {
    return <AutoLinkPlugin matchers={MATCHERS} />;
}

export default RedditAutoLinkPlugin;
