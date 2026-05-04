import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserComments } from "../../services/profile";
import type { UserComments } from "../../services/profile";

export default function CommentsTab() {
    const {data: userComments} = useSuspenseQuery({
        queryKey: ['userComments'],
        queryFn: async () => await getUserComments()
    })

    return (
    <>
        {userComments?.map(comment=>(
            <CommentCard key={comment.id} comment={comment} />
        ))}
    </>
    )
}

function CommentCard({comment} : {comment : UserComments}) {
    const interactionClass = "flex items-center gap-1 rounded-[15px] bg-[#c4cfc5] px-2 py-1";

    return (
        <div className="mb-1 flex flex-col gap-2 rounded-lg border border-black p-2.5 text-[1.4rem]">
            <div className="flex items-center gap-2.5 font-bold">
                <span>r/{comment.community_name}</span>
                <span>.</span>
            </div>
            <div className="text-[1.2rem]">
                <span>{comment.post_title}</span>
            </div>
            <div className="font-bold">
                <span>{comment.comment_author}</span>
                <span>1 mo. ago</span>
            </div>
            <div>
                <span dangerouslySetInnerHTML={{__html: comment.left}} />
            </div>
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-1 rounded-[15px] bg-[#f56f42] px-1 py-1">
                    <i className='bi bi-arrow-up' style={{color: comment.status === 'upvoted' ? 'red' : 'black'}}></i>
                    <span>{comment.score}</span>
                    <i className='bi bi-arrow-down' style={{color: comment.status === 'downvoted' ? 'red' : 'black'}}></i>
                </div>

                <div className={interactionClass}>
                    <i className="bi bi-chat-left-text"></i>
                    <span>Reply</span>
                </div>

                <div className={interactionClass}>
                    <i className='bi bi-share'></i>
                    <span>share</span>
                </div>
            </div>
        </div>
    )
}
