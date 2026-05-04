import { useParams } from 'react-router-dom'
import { useEffect , useState } from 'react'
import { getCommunity } from '../../services/community'
import type { Community } from '../../services/community'
    
const CommunityRightSideBar = () => {
    const { communityName } = useParams()
    const [communityData, setCommunityData] = useState<Community | null>(null)

    useEffect(()=>{
        const fetchCommunity = async () => {
            try{
                const data = await getCommunity(communityName!)
                setCommunityData(data)
            } catch (error) {
                console.error('Error fetching community data:', error)
            }
        }
        fetchCommunity()
    }, [communityName])

    return (
        <aside className="flex flex-[2] flex-col gap-5 p-5">
            <div className="flex flex-col gap-2.5 border-b border-slate-400">
                <div className="flex items-center justify-between">
                    <span className="cursor-pointer text-[1.6rem] font-bold">r/{communityData?.name}</span>
                    <span className="cursor-pointer rounded-[30px] bg-slate-400 px-3 py-1.5">Joined</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[1.2rem] font-bold">
                        The {communityData?.name} community
                    </span>
                    <span className="text-slate-600">
                        {communityData?.description || 'No description available.'}
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <i className="bi bi-calendar2-plus"></i>
                        <span>Created Jan 1, 2020</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <i className="bi bi-globe"></i>
                        <span>{communityData?.visibility || 'Public'}</span>
                    </div>
                </div>
                <div className="mx-5 flex cursor-pointer justify-center rounded-[15px] bg-slate-400 p-2 text-[1.2rem] font-bold">
                    <span>Community Guide</span>
                </div>
                <div className="mb-5 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[1.2rem] font-bold">123k</span>
                        <span>Members</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[1.2rem] font-bold">456</span>
                        <span>Online</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2.5 border-b border-slate-400">
                <span className="text-[1.6rem] font-bold">Filter By Flair</span>
                <div className="mb-5 flex gap-5">
                    {communityData?.flairs?.map((flair) => (
                        <div key={flair.id} className="mb-3 inline-block w-fit rounded-[15px] px-2 py-1" style={{backgroundColor: flair.background_color}}>
                            <span style={{color: flair.text_color}}>{flair.title}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-2.5">
                <span className="text-[1.6rem] font-bold">Community Rules</span>
                <ol className="flex list-decimal flex-col gap-1 pl-5 text-[1.4rem]">
                    <li>No spamming or self-promotion.</li>
                    <li>Be respectful to others.</li>
                    <li>Use appropriate flairs for your posts.</li>
                    <li>No NSFW content.</li>
                    <li>Follow Reddit's content policy.</li>
                </ol>
            </div>
        </aside>
    )
}

export default CommunityRightSideBar
