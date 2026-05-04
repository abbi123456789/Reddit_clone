import { useQuery } from "@tanstack/react-query";
import { getPostFeed } from "../services/posts";
import PostCard from "./post/PostCard";

export default function FeedPosts(){
    const {data: feedPosts} = useQuery({
        queryKey: ['feed', 'posts'],
        queryFn: async () => await getPostFeed()
    })
    console.log(feedPosts)
    return(
        <div className="mb-10 flex flex-col gap-5">
            {feedPosts?.map((post)=>(
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    )
}
