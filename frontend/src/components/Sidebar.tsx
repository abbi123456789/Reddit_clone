import { getMyCommunities } from '../services/community'
import type { Community } from '../services/community'
import { useEffect, useState } from 'react'
import { Button } from 'react-aria-components'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

type SidebarProps = {
    showModal?: boolean
    handleModalToggle: () => void
}

const Sidebar = ({handleModalToggle}:SidebarProps)=>{
    const { isAuthenticated } = useAuth()
    const [myCommunities, setMyCommunities] = useState<Community[]>([])
    const menuSectionClass = "flex flex-col gap-4 border-b border-gray-300 pb-4";
    const menuItemClass = "flex cursor-pointer gap-4 rounded-[10px] p-4 hover:bg-gray-300";

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
        <aside className="flex h-screen w-[300px] flex-col gap-8 overflow-auto border-r border-gray-300 p-8 text-[2.2rem] [scrollbar-width:none]">
            <div className={menuSectionClass}>
                <div className={menuItemClass}>
                    <i className="bi bi-house-door-fill"></i>
                    <span>Home</span>
                </div>
                <div className={menuItemClass}>
                    <i className="bi bi-graph-up-arrow"></i>
                    <span>Popular</span>
                </div>
                <div className={menuItemClass}>
                    <i className="bi bi-newspaper"></i>
                    <span>News</span>
                </div>
                <div className={menuItemClass}>
                    <i className="bi bi-boxes"></i>
                    <span>Explore</span>
                </div>
                {isAuthenticated && 
                <Button className={`${menuItemClass} items-center border-0 bg-transparent text-left font-inherit`} onPress={() => handleModalToggle()}>
                    <i className="bi bi-plus-lg"></i>
                    <span>Start a Community</span>
                </Button>
                }
            </div>
            {isAuthenticated &&
            <div className={menuSectionClass}>
                <div className={menuItemClass}>
                    <i className="bi bi-text-left"></i>
                    <span>Mod Queue</span>
                </div>
                <div className={menuItemClass}>
                    <i className="bi bi-envelope"></i>
                    <span>Mod Mail</span>
                </div>
                <div className={menuItemClass}>
                    <i className="bi bi-text-left"></i>
                    <span>r/Mod</span>
                </div>
                <div className={menuItemClass}>
                    <i className="bi bi-gear"></i>
                    <span>Manage</span>
                </div>
                {/* Display user's communities if they have any */}
                {myCommunities.length > 0 && (
                <div>
                    {myCommunities.map((community: any) => (
                        <Link to={`/r/${community.name}`} className="text-inherit" key={community.id}>
                            <div key={community.id}>
                                <span>{community.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
                )}
            </div>
            }       

            <div className={menuSectionClass}>
                <div className={menuItemClass}>
                    <i className="bi bi-reddit"></i>
                    <span>About Reddit</span>
                </div>
                <div className={menuItemClass}>
                    <i className="bi bi-megaphone"></i>
                    <span>Advertise</span>
                </div>
                <div className={menuItemClass}>
                    <i className="bi bi-opencollective"></i>
                    <span>Developer Platform</span>
                </div>
                <div className={menuItemClass}>
                    <i className="bi bi-pie-chart"></i>
                    <span>Reddit Pro</span>
                </div>
                <div className={menuItemClass}>
                    <i className="bi bi-question-circle"></i>
                    <span>Help</span>
                </div>
                <div className={menuItemClass}>
                    <i className="bi bi-book"></i>
                    <span>Blog</span>
                </div>
                <div className={menuItemClass}>
                    <i className="bi bi-book"></i>
                    <span>Careers</span>
                </div>
                <div className={menuItemClass}>
                    <i className="bi bi-fire"></i>
                    <span>Press</span>
                </div>
            </div>

            <div className={menuSectionClass}>
                <div className={menuItemClass}>
                    <i className="bi bi-book"></i>
                    <span>Reddit Rules</span>
                </div>
                <div className={menuItemClass}>
                    <i className="bi bi-book"></i>
                    <span>Privacy Policy</span>
                </div>
                <div className={menuItemClass}>
                    <i className="bi bi-book"></i>
                    <span>User Agreement</span>
                </div>
                <div className={menuItemClass}>
                    <i className="bi bi-universal-access-circle"></i>
                    <span>Accessibility</span>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;
