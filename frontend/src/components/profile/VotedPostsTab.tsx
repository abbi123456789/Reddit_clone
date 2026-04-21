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
    return (
        <div className="user-post-card">
            <div className="community-info">
                <div className="community-info-left">
                    <span>r/{post.community_name}</span>
                    <span>.</span>
                    <span>5 mo. ago</span>
                </div>
                <div className="community-info-right">
                    <i className="bi bi-three-dots"></i>
                </div>
            </div>
            <div className="post-title">
                <span className="post-title-text">{post.title}</span>
            </div>
            <div className="post-body">
                <span dangerouslySetInnerHTML={{__html: post.left}} />
            </div>
            <div className='post-interactions'>
                <div className='vote-section'>
                    <i className="bi bi-arrow-up vote-button" style={{color: post.status === 'upvoted' ? 'red' : 'black'}}></i>
                    <span className='vote-count'>{post.score}</span>
                    <i className="bi bi-arrow-down vote-button" style={{color: post.status === 'downvoted' ? 'red' : 'black'}}></i>
                </div>

                <div className='comment-section'>
                    <i className="bi bi-chat-left-text comment-icon"></i>
                    <span className='comment-count'>10</span>
                </div>

                <div className='share-section'>
                    <i className="bi bi-share share-icon"></i>
                    <span className='share-text'>Share</span>
                </div>
            </div>
        </div>
    )
}