import { Link, useParams } from 'react-router-dom';

const LookAndFeel = ()=>{
    const { communityName } = useParams();
    const actionClass = "mr-[50px] flex cursor-pointer items-center justify-between rounded-[10px] px-2.5 py-1.5 text-inherit no-underline hover:bg-[#f7f5f5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700";
    const labelClass = "flex flex-col [&_p]:text-[1.2rem] [&_p]:text-[#5a5757] [&_span]:text-[2rem] [&_span]:font-bold";

    return(
        <main className="flex flex-1 flex-col gap-[50px]">
            <div className="text-[3.5rem] font-bold">
                <span>Look and Feel</span>
            </div>
            <div className="flex flex-col gap-5 text-[1.4rem]">
                <div className={actionClass}>
                    <div className={labelClass}>
                        <span>Community appearance</span>
                        <p>Customize your community icon, banner image and colors</p>
                    </div>
                    <span>&gt;</span>
                </div>

                <Link to={`/r/mod/${encodeURIComponent(communityName ?? "")}/post-flair`} className={actionClass}>
                    <div className={labelClass}>
                        <span>Post flair</span>
                        <p>Visual tags members of your community can add to their posts.</p>
                    </div>
                    <span>&gt;</span>
                </Link>

                <div className={actionClass}>
                    <div className={labelClass}>
                        <span>User flair</span>
                        <p>Visual tags members of your community can add to their usernames</p>
                    </div>
                    <span>&gt;</span>
                </div>

                <div className={actionClass}>
                    <div className={labelClass}>
                        <span>Custom emoji</span>
                        <p>Upload custom emoji to use in flair and community status</p>
                    </div>
                    <span>&gt;</span>
                </div>
            </div>
        </main>
    )
}

export default LookAndFeel;
