import '../styles/sidebar.css'
import { getMyCommunities } from '../services/community'
import type { Community } from '../services/community'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

type SidebarProps = {
    showModal?: boolean
    handleModalToggle: () => void
}

const Sidebar = ({handleModalToggle}:SidebarProps)=>{
    const { isAuthenticated } = useAuth()
    const [myCommunities, setMyCommunities] = useState<Community[]>([])

    useEffect(()=>{
        const fetchCommunities = async () => {
            const communities = await getMyCommunities()
            if(communities){
                setMyCommunities(communities)
            }
        }
        if(isAuthenticated){
            fetchCommunities()
        }
    }, [])

    return (
        <aside className="sidebar">
            <div className="post-options">
                <div className="home">
                    <i className="bi bi-house-door-fill"></i>
                    <span>Home</span>
                </div>
                <div className="popular">
                    <i className="bi bi-graph-up-arrow"></i>
                    <span>Popular</span>
                </div>
                <div className="news">
                    <i className="bi bi-newspaper"></i>
                    <span>News</span>
                </div>
                <div className="explore">
                    <i className="bi bi-boxes"></i>
                    <span>Explore</span>
                </div>
                {isAuthenticated && 
                <div className="start-community" onClick={() => handleModalToggle()}>
                    <i className="bi bi-plus-lg"></i>
                    <span>Start a Community</span>
                </div>
                }
            </div>
            {isAuthenticated &&
            <div className="moderator-options">
                <div className="mod-queue">
                    <i className="bi bi-text-left"></i>
                    <span>Mod Queue</span>
                </div>
                <div className="mod-mail">
                    <i className="bi bi-envelope"></i>
                    <span>Mod Mail</span>
                </div>
                <div className="mod-community">
                    <i className="bi bi-text-left"></i>
                    <span>r/Mod</span>
                </div>
                <div className="manage">
                    <i className="bi bi-gear"></i>
                    <span>Manage</span>
                </div>
                {/* Display user's communities if they have any */}
                {myCommunities.length > 0 && (
                <div className='my-communities'>
                    {myCommunities.map((community: any) => (
                        <Link to={`/r/${community.name}`} style={{ textDecoration: 'none', color: 'inherit' }} key={community.id}>
                            <div className='community' key={community.id}>
                                <span>{community.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
                )}
            </div>
            }       

            <div className='resources'>
                <div className='about-reddit'>
                    <i className="bi bi-reddit"></i>
                    <span>About Reddit</span>
                </div>
                <div className='advertise'>
                    <i className="bi bi-megaphone"></i>
                    <span>Advertise</span>
                </div>
                <div className='developer-platform'>
                    <i className="bi bi-opencollective"></i>
                    <span>Developer Platform</span>
                </div>
                <div className='reddit-pro'>
                    <i className="bi bi-pie-chart"></i>
                    <span>Reddit Pro</span>
                </div>
                <div className='help'>
                    <i className="bi bi-question-circle"></i>
                    <span>Help</span>
                </div>
                <div className='blog'>
                    <i className="bi bi-book"></i>
                    <span>Blog</span>
                </div>
                <div className='careers'>
                    <i className="bi bi-book"></i>
                    <span>Careers</span>
                </div>
                <div className='press'>
                    <i className="bi bi-fire"></i>
                    <span>Press</span>
                </div>
            </div>

            <div className='rules'>
                <div className='reddit-rules'>
                    <i className="bi bi-book"></i>
                    <span>Reddit Rules</span>
                </div>
                <div className='privacy-policy'>
                    <i className="bi bi-book"></i>
                    <span>Privacy Policy</span>
                </div>
                <div className='user-agreement'>
                    <i className="bi bi-book"></i>
                    <span>User Agreement</span>
                </div>
                <div className='accessibility'>
                    <i className="bi bi-universal-access-circle"></i>
                    <span>Accessibility</span>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;