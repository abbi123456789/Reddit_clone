import { useParams, Link } from 'react-router-dom'
import { userJoinedCommunity } from '../../services/community';
import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { iconButtonClass, primaryButtonClass, secondaryButtonClass } from '../../styles/theme';

const CommunityHeader = ()=>{
    const {communityName} = useParams();
    const {isAuthenticated} = useAuth();

    const {data: joinStatus} = useQuery({
        queryKey: ['community', 'join', 'status', communityName],
        queryFn: async () => await userJoinedCommunity(communityName!),
    })
    console.log(joinStatus)
    
    return (
        <header className="w-full min-w-0 text-[1.4rem] md:text-[1.6rem]">
            <div>
                <img className="block h-36 w-full rounded-xl object-cover md:h-48" src="/images/bannerBackgroundImage.png" alt="Background Image" />
            </div>
            <section className="relative mt-[-36px] flex w-full px-2 pb-5 md:mt-[-44px] md:px-4 md:pb-6">
                <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex min-w-0 items-end gap-2">
                        <div className="h-[72px] w-[72px] shrink-0 md:h-[88px] md:w-[88px]">
                            <img className="h-full w-full rounded-full border-4 border-white shadow-[0_6px_18px_rgba(15,23,42,0.16)]" src="/images/communityIcon.jpg" alt="Community Icon" />
                        </div>
                        <div className="min-w-0">
                            <h1 className="truncate text-[2rem] font-bold md:text-[2.4rem]">r/{communityName}</h1>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 md:gap-5">
                        <div>
                            <Link to={`/r/${communityName}/submit`} className={`${primaryButtonClass} flex gap-2.5 p-2.5`}>
                                <i className="bi bi-plus-lg"></i>
                                <p className="hidden sm:block">Create Post</p>
                            </Link>
                        </div>
                        <div className={`${iconButtonClass} border border-slate-300 bg-white p-2.5 font-bold`}>
                            <i className="bi bi-bell"></i>
                        </div>
                        {isAuthenticated && 
                        <div className={`${secondaryButtonClass} cursor-pointer p-2.5 font-bold`}>
                            {joinStatus ? <p>Joined</p> : <p>Join</p>}
                        </div>
                        }
                        <div className={`${iconButtonClass} border border-slate-300 bg-white p-2.5 font-bold`}>
                            <i className="bi bi-three-dots"></i>
                        </div>
                    </div>
                </div>
            </section>
        </header>
    )
}

export default CommunityHeader
