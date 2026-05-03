import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCommunityPosts } from "../../services/community";
import PostCard from "../post/PostCard";
import '../../styles/communitypage.css'

export default function CommunityPosts(){
    const { communityName } = useParams();
    const {data: communityPosts } = useQuery({
        queryKey: ['community', 'posts', communityName],
        queryFn: async () => await getCommunityPosts(communityName!),
    })
    return(
        <div className='community-posts'>
            {communityPosts?.map((post)=>(
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    )
}