import type { Post } from "../../services/posts";
import { Link } from "react-router-dom";
import { actionPillClass, cardClass, voteButtonClass, votePillClass } from "../../styles/theme";

type PostCardProps = {
    post: Post
}

const POST_PREVIEW_MAX_LENGTH = 220;

const getPlainTextPreview = (html?: string | null) => {
    if (!html) {
        return "";
    }

    const text = typeof DOMParser !== "undefined"
        ? new DOMParser().parseFromString(html, "text/html").body.textContent ?? ""
        : html.replace(/<[^>]*>/g, " ");

    const normalizedText = text.replace(/\s+/g, " ").trim();

    if (normalizedText.length <= POST_PREVIEW_MAX_LENGTH) {
        return normalizedText;
    }

    return `${normalizedText.slice(0, POST_PREVIEW_MAX_LENGTH).trimEnd()}...`;
}

export default function PostCard({post}: PostCardProps){
    const contentPreview = getPlainTextPreview(post.content_html);

    return (
        <Link to={`/r/${post.community_name}/comments/${post.id}/${post.slug}`} className="block text-inherit">
        <div className={`${cardClass} flex flex-col gap-2.5 p-3 transition-colors hover:border-orange-200 hover:bg-orange-50/30`}>
            <div className="flex items-center gap-1">
                <div>
                    <strong className="text-slate-600">r/{post.community_name}</strong>
                </div>
                <span>.</span>
                <span>2hr. ago</span>
            </div>
            <div className="flex flex-col gap-1">
                <div className="text-[1.6rem]">
                    <strong className="text-black">{post.title}</strong>
                </div>
                {contentPreview && (
                    <p className="overflow-hidden text-ellipsis whitespace-nowrap text-[1.2rem] text-slate-600">
                        {contentPreview}
                    </p>
                )}
            </div>
            <div className="flex items-center gap-5">
                <div className={votePillClass}>
                    <i className={`bi bi-arrow-up ${voteButtonClass}`} style={{color: post.vote_status === 'upvoted' ? 'red' : 'black'}}></i>
                    <span>{post.score}</span>
                    <i className={`bi bi-arrow-down ${voteButtonClass}`} style={{color: post.vote_status === 'downvoted' ? 'red' : 'black'}}></i>
                </div>

                <div className={actionPillClass}>
                    <i className="bi bi-chat-left-text"></i>
                    <span>{post.comment_count}</span>
                </div>

                <div className={actionPillClass}>
                    <i className="bi bi-share"></i>
                    <span>Share</span>
                </div>
            </div>
        </div>
        </Link>
    )
}
