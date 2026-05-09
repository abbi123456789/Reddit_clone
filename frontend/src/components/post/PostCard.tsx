import type { Post } from "../../services/posts";
import { Link } from "react-router-dom";
type PostCardProps = {
    post: Post
}

export default function PostCard({post}: PostCardProps){
    const interactionClass = "flex items-center gap-1 rounded-[20px] bg-[#dae0e5] px-4 py-2";
    const voteButtonClass = "cursor-pointer px-2 py-1 hover:rounded-[25px] hover:bg-slate-400";

    return (
        <Link to={`/r/${post.community_name}/comments/${post.id}/${post.slug}`} className="block text-inherit">
        <div className="flex flex-col gap-2.5 rounded-[10px] border border-slate-500 p-2">
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
                <div className="text-[1.2rem] text-slate-600">
                    <div className="flex flex-col gap-1" dangerouslySetInnerHTML={{ __html: post.content_html! }} />
                </div>
            </div>
            <div className="flex items-center gap-5">
                <div className="flex items-center gap-0.5 rounded-[20px] bg-[#dae0e5] px-2 py-2">
                    <i className={`bi bi-arrow-up ${voteButtonClass}`} style={{color: post.vote_status === 'upvoted' ? 'red' : 'black'}}></i>
                    <span>{post.score}</span>
                    <i className={`bi bi-arrow-down ${voteButtonClass}`} style={{color: post.vote_status === 'downvoted' ? 'red' : 'black'}}></i>
                </div>

                <div className={interactionClass}>
                    <i className="bi bi-chat-left-text"></i>
                    <span>{post.comment_count}</span>
                </div>

                <div className={interactionClass}>
                    <i className="bi bi-share"></i>
                    <span>Share</span>
                </div>
            </div>
        </div>
        </Link>
    )
}
