import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserComments } from "../../services/profile";
import type { UserComments } from "../../services/profile";
import { actionPillClass, cardClass, votePillClass } from "../../styles/theme";

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
    return (
        <div className={`${cardClass} mb-1 flex flex-col gap-2 p-2.5 text-[1.4rem]`}>
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
                <div className={votePillClass}>
                    <i className='bi bi-arrow-up' style={{color: comment.status === 'upvoted' ? 'red' : 'black'}}></i>
                    <span>{comment.score}</span>
                    <i className='bi bi-arrow-down' style={{color: comment.status === 'downvoted' ? 'red' : 'black'}}></i>
                </div>

                <div className={actionPillClass}>
                    <i className="bi bi-chat-left-text"></i>
                    <span>Reply</span>
                </div>

                <div className={actionPillClass}>
                    <i className='bi bi-share'></i>
                    <span>share</span>
                </div>
            </div>
        </div>
    )
}
