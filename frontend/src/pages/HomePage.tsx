import { useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import FeedPosts from "../components/FeedPosts"
import RecentPosts from "../components/post/RecentPosts"
import MobileSidebarDrawer from "../components/MobileSidebarDrawer"
import { appContentClass, appShellClass, scrollContentClass } from "../styles/theme"

const HomePage = ()=>{
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

    return (
        <main className={appShellClass}>
            <Navbar onMenuToggle={() => setIsMobileSidebarOpen(true)} />
            <div className={appContentClass}>
                <div className="hidden shrink-0 lg:flex">
                    <Sidebar />
                </div>
                <div className={`${scrollContentClass} mb-12 pb-10 lg:gap-8`}>
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
