import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCommunityPosts } from "../../services/community";
import PostCard from "../post/PostCard";

export default function CommunityPosts(){
    const { communityName } = useParams();
    const {data: communityPosts } = useQuery({
        queryKey: ['community', 'posts', communityName],
        queryFn: async () => await getCommunityPosts(communityName!),
    })
    return(
        <div className="mb-10 flex flex-col gap-5">
            {communityPosts?.map((post)=>(
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    )
}
