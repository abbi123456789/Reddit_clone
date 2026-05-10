import { useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import CommunityRightSideBar from "../components/community/CommunityRightSideBar"
import MobileSidebarDrawer from "../components/MobileSidebarDrawer"
import PostCreationForm from "../components/post/PostCreationForm"
import { appContentClass, appShellClass, scrollContentClass } from "../styles/theme"

const CreatePost = ()=>{
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    const { communityName } = useParams()

    return (
        <main className={appShellClass}>
            <Navbar onMenuToggle={() => setIsMobileSidebarOpen(true)} />
            <div className={appContentClass}>
                <div className="hidden shrink-0 lg:flex">
                    <Sidebar />
                </div>
                <div className={`${scrollContentClass} lg:gap-8`}>
                    <PostCreationForm />
                    {communityName && (
                        <div className="hidden min-w-[280px] max-w-[360px] flex-[2] lg:block">
                            <CommunityRightSideBar />
                        </div>
                    )}
                </div>
            </div>
            <MobileSidebarDrawer
                isOpen={isMobileSidebarOpen}
                onClose={() => setIsMobileSidebarOpen(false)}
            />
        </main>
    )
}

export default CreatePost
