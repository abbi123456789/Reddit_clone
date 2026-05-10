import { getMyCommunities } from '../services/community'
import type { Community } from '../services/community'
import { useEffect, useState } from 'react'
import { Button } from 'react-aria-components'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCommunityModal } from '../context/CommunityModalContext'
import { subtleButtonClass } from '../styles/theme'

type SidebarProps = {
    className?: string
    bordered?: boolean
    fullWidth?: boolean
}

const Sidebar = ({
    className = "",
    bordered = true,
    fullWidth = false,
}:SidebarProps)=>{
    const { isAuthenticated } = useAuth()
    const { openCommunityModal } = useCommunityModal()
    const [myCommunities, setMyCommunities] = useState<Community[]>([])
    const menuSectionClass = "flex flex-col gap-3 border-b border-slate-200 pb-4";
    const menuItemClass = "flex cursor-pointer gap-4 rounded-[12px] p-4 text-slate-700 transition-colors hover:bg-orange-50 hover:text-orange-700";

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
        <aside
            className={`flex h-full ${fullWidth ? "w-full max-w-none" : "w-full max-w-[300px]"} flex-col gap-8 overflow-auto bg-white p-6 text-[2rem] [scrollbar-width:none] md:p-8 md:text-[2.2rem] ${bordered ? "border-r border-slate-200" : ""} ${className}`}
        >
            <div className={menuSectionClass}>
                <Link to="/" className="text-inherit">
                    <div className={menuItemClass}>
                        <i className="bi bi-house-door-fill"></i>
                        <span>Home</span>
                    </div>
                </Link>
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
                <Button className={`${menuItemClass} items-center border-0 bg-transparent text-left font-inherit`} onPress={openCommunityModal}>
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
                            <div className={`${subtleButtonClass} justify-start rounded-[12px] text-left`} key={community.id}>
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
