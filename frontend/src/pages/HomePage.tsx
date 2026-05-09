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
                <div className="flex min-h-0 min-w-0 flex-1 overflow-y-auto px-3 py-4 md:px-5 md:py-5 lg:gap-8">
                    <FeedPosts />
                    <div className="hidden lg:block">
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
