import { useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import CommunityHeader from "../components/community/CommunityHeader"
import CommunityRightSideBar from "../components/community/CommunityRightSideBar"
import CommunityPosts from "../components/community/CommunityPosts"
import MobileSidebarDrawer from "../components/MobileSidebarDrawer"

const CommunityPage = ()=>{
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

    return (
        <main className="flex h-screen flex-col overflow-hidden">
            <Navbar onMenuToggle={() => setIsMobileSidebarOpen(true)} />
            <div className="flex min-h-0 min-w-0 flex-1">
                <div className="hidden shrink-0 lg:flex">
                    <Sidebar />
                </div>
                <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto px-3 py-4 md:px-5 md:py-5">
                    <CommunityHeader />
                    <div className="flex min-h-0 min-w-0 flex-1 lg:gap-8">
                        <CommunityPosts />
                        <div className="hidden min-w-[280px] max-w-[360px] flex-[2] lg:block">
                            <CommunityRightSideBar />
                        </div>
                    </div>
                </div>
            </div>
            <MobileSidebarDrawer
                isOpen={isMobileSidebarOpen}
                onClose={() => setIsMobileSidebarOpen(false)}
            />
        </main>
    )
}

export default CommunityPage
