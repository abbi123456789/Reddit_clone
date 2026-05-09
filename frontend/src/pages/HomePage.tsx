import { useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import FeedPosts from "../components/FeedPosts"
import RecentPosts from "../components/post/RecentPosts"
import MobileSidebarDrawer from "../components/MobileSidebarDrawer"

const HomePage = ()=>{
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

    return (
        <main className="flex h-screen flex-col overflow-hidden">
            <Navbar onMenuToggle={() => setIsMobileSidebarOpen(true)} />
            <div className="flex min-h-0 min-w-0 flex-1">
                <div className="hidden shrink-0 lg:flex">
                    <Sidebar />
                </div>
                <div className="flex min-h-0 min-w-0 flex-1 overflow-y-auto px-3 pt-4 pb-10 mb-12 md:px-5 md:pt-5 lg:gap-8">
                    <FeedPosts />
                    <div className="hidden min-w-[280px] max-w-[360px] flex-[2] lg:block">
                        <RecentPosts />
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

export default HomePage
