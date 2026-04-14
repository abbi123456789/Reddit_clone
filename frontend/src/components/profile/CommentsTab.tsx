import { useQuery } from "@tanstack/react-query";
import { getUserComments } from "../../services/profile";
import { Suspense } from 'react'

export default function CommentsTab() {
    const {data: userComments} = useQuery({
        queryKey: ['userComments'],
        queryFn: async () => await getUserComments()
    })

    return (
        <Suspense fallback={<p>Loading...</p>}>
        {userComments?.map(comment=>(
            <p key={comment.id}>{comment.content_html}</p>
        ))}
        </Suspense>
    )
}