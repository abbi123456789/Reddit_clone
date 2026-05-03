import '../../styles/communityheader.css'
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
        <header className="community-header">
            <div className="background-image">
                <img src="/images/bannerBackgroundImage.png" alt="Background Image" />
            </div>
            <section className="community-header-section">
                <div className="community-header-section-wrapper">
                    <div className="community-icon">
                        <div className='community-icon-image'>
                            <img src="/images/communityIcon.jpg" alt="Community Icon" />
                        </div>
                        <div className="community-name">
                            <h1>r/{communityName}</h1>
                        </div>
                    </div>

                    <div className="community-header-buttons">
                        <div>
                            <Link to={`/r/${communityName}/submit`} className='create-post'>
                                <i className="bi bi-plus-lg"></i>
                                <p>Create Post</p>
                            </Link>
                        </div>
                        <div className="notification-status">
                            <i className="bi bi-bell"></i>
                        </div>
                        {isAuthenticated && 
                        <div className="join-status">
                            {joinStatus ? <p>Joined</p> : <p>Join</p>}
                        </div>
                        }
                        <div className="more-options">
                            <i className="bi bi-three-dots"></i>
                        </div>
                    </div>
                </div>
            </section>
        </header>
    )
}

export default CommunityHeader