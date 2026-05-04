import { useParams, Link } from 'react-router-dom'
import { userJoinedCommunity } from '../../services/community';
import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';

const CommunityHeader = ()=>{
    const {communityName} = useParams();
    const {isAuthenticated} = useAuth();

    const {data: joinStatus} = useQuery({
        queryKey: ['community', 'join', 'status', communityName],
        queryFn: async () => await userJoinedCommunity(communityName!),
    })
    console.log(joinStatus)
    
    return (
        <header className="w-full text-[1.6rem]">
            <div>
                <img className="block h-48 w-full rounded-xl object-cover" src="/images/bannerBackgroundImage.png" alt="Background Image" />
            </div>
            <section className="relative mt-[-44px] flex w-full px-4 pb-6">
                <div className="flex flex-1 items-end justify-between">
                    <div className="flex items-end gap-2">
                        <div className="h-[88px] w-[88px] shrink-0">
                            <img className="h-full w-full rounded-full border border-gray-500" src="/images/communityIcon.jpg" alt="Community Icon" />
                        </div>
                        <div>
                            <h1>r/{communityName}</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="cursor-pointer rounded-[25px] border border-black p-2.5 font-bold">
                            <Link to={`/r/${communityName}/submit`} className="flex gap-2.5">
                                <i className="bi bi-plus-lg"></i>
                                <p>Create Post</p>
                            </Link>
                        </div>
                        <div className="cursor-pointer rounded-[25px] border border-black p-2.5 font-bold">
                            <i className="bi bi-bell"></i>
                        </div>
                        {isAuthenticated && 
                        <div className="cursor-pointer rounded-[25px] border border-black p-2.5 font-bold">
                            {joinStatus ? <p>Joined</p> : <p>Join</p>}
                        </div>
                        }
                        <div className="cursor-pointer rounded-[25px] border border-black p-2.5 font-bold">
                            <i className="bi bi-three-dots"></i>
                        </div>
                    </div>
                </div>
            </section>
        </header>
    )
}

export default CommunityHeader
