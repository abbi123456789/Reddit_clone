import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserComments } from "../../services/profile";

export default function CommentsTab() {
    const {data: userComments} = useSuspenseQuery({
        queryKey: ['userComments'],
        queryFn: async () => await getUserComments()
    })

    return (
    <>
        {userComments?.map(comment=>(
            <p key={comment.id}>{comment.id}</p>
        ))}
    </>
    )
}