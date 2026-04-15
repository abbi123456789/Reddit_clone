import { useSuspenseQuery } from "@tanstack/react-query"
import { getUserVotedPosts } from "../../services/profile"

export default function VotedPostsTab({value}:{value:number}) {
    const {data: userVotedPosts} = useSuspenseQuery({
        queryKey: ['userVotedPosts', value],
        queryFn: async () => await getUserVotedPosts(value),
    })
    console.log(userVotedPosts)
    return (
        <>
        {userVotedPosts?.map(post=>(
            <p key={post.id}>{post.title}</p>
        ))}
        </>
    )
}