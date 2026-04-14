import { useQuery } from "@tanstack/react-query"
import { getUserPosts } from "../../services/profile"

export default function PostsTab (){
    const {data:userPosts} = useQuery({
        queryKey: ['userPosts'],
        queryFn: async () => await getUserPosts()
    })
    return (
        <>
        {userPosts?.map(post=>(
            <p key={post.id}>{post.title}</p>
        ))}
        </>
    )
}