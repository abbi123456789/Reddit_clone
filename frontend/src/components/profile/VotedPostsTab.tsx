import { useSuspenseQuery } from "@tanstack/react-query"
import { getUserVotedPosts } from "../../services/profile"
import type { UserPosts } from "../../services/profile"

export default function VotedPostsTab({value}:{value:number}) {
    const {data: userVotedPosts} = useSuspenseQuery({
        queryKey: ['userVotedPosts', value],
        queryFn: async () => await getUserVotedPosts(value),
    })
    console.log(userVotedPosts)
    return (
        <>
        {userVotedPosts?.map(post=>(
            <PostCard key={post.id} post={post} />
        ))}
        </>
    )
}

function PostCard ({post}: {post:UserPosts}) {
    console.log(post)
    const interactionClass = "flex items-center gap-1 rounded-[15px] bg-[#c4cfc5] px-2 py-1";

    return (
        <div className="flex flex-col gap-2.5 rounded-lg border border-black p-2.5 text-[1.4rem]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <span>r/{post.community_name}</span>
                    <span>.</span>
                    <span>5 mo. ago</span>
                </div>
                <div>
                    <i className="bi bi-three-dots"></i>
                </div>
            </div>
            <div>
                <span>{post.title}</span>
            </div>
            <div>
                <span dangerouslySetInnerHTML={{__html: post.left}} />
            </div>
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-1 rounded-[15px] bg-[#f56f42] px-1 py-1">
                    <i className="bi bi-arrow-up" style={{color: post.status === 'upvoted' ? 'red' : 'black'}}></i>
                    <span>{post.score}</span>
                    <i className="bi bi-arrow-down" style={{color: post.status === 'downvoted' ? 'red' : 'black'}}></i>
                </div>

                <div className={interactionClass}>
                    <i className="bi bi-chat-left-text"></i>
                    <span>10</span>
                </div>

                <div className={interactionClass}>
                    <i className="bi bi-share"></i>
                    <span>Share</span>
                </div>
            </div>
        </div>
    )
}
