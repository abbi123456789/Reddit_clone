import { useParams } from 'react-router-dom'
import '../../styles/communityrightsidebar.css'
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
        <aside className="community-right-sidebar">
            <div className='community-info'>
                <div className='title-join'>
                    <span className="community-name">r/{communityData?.name}</span>
                    <span className="join-status">Joined</span>
                </div>
                <div className='community-description'>
                    <span className='description-header'>
                        The {communityData?.name} community
                    </span>
                    <span className='description-body'>
                        {communityData?.description || 'No description available.'}
                    </span>
                </div>
                <div className='community-type'>
                    <div className='community-creation'>
                        <i className="bi bi-calendar2-plus"></i>
                        <span className='creation-date'>Created Jan 1, 2020</span>
                    </div>
                    <div className='community-visibility'>
                        <i className="bi bi-globe"></i>
                        <span className='visibility'>{communityData?.visibility || 'Public'}</span>
                    </div>
                </div>
                <div className='community-guidelines'>
                    <span>Community Guide</span>
                </div>
                <div className='community-stats'>
                    <div className='stat-item'>
                        <span className='stat-count'>123k</span>
                        <span className='stat-label'>Members</span>
                    </div>
                    <div className='stat-item'>
                        <span className='stat-count'>456</span>
                        <span className='stat-label'>Online</span>
                    </div>
                </div>
            </div>

            <div className='flair-display'>
                <span className='flair-header'>Filter By Flair</span>
                <div className='flair-options'>
                    {communityData?.flairs?.map((flair) => (
                        <div key={flair.id} className='flair-option' style={{backgroundColor: flair.background_color, padding: '4px 8px', borderRadius: '15px', display: 'inline-block', marginBottom: '12px', 'width':'fit-content'}}>
                            <span className='flair-text' style={{color: flair.text_color}}>{flair.title}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className='community-rules'>
                <span className='rules-header'>Community Rules</span>
                <ol className='rules-list'>
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
