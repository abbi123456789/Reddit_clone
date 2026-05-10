import { useState } from "react"
import Navbar from "../components/Navbar"
import MobileModeratorSidebarDrawer from "../components/Moderator/MobileModeratorSidebarDrawer"
import ModeratorSidebar from "../components/Moderator/Sidebar"
import LookAndFeel from "../components/Moderator/CommunityLookAndFeel"
import { appShellClass, scrollContentClass } from "../styles/theme"

const LookAndFeelPage = ()=>{
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

    return(
        <main className={appShellClass}>
            <Navbar onMenuToggle={() => setIsMobileSidebarOpen(true)} />
            <div className="flex min-h-0 min-w-0 flex-1 bg-slate-50 text-[1.6rem] lg:gap-5">
                <div className="hidden shrink-0 lg:flex">
                    <ModeratorSidebar/>
                </div>
                <div className={scrollContentClass}>
                    <LookAndFeel />
                </div>
            </div>
            <MobileModeratorSidebarDrawer
                isOpen={isMobileSidebarOpen}
                onClose={() => setIsMobileSidebarOpen(false)}
            />
        </main>
    )
}

export default LookAndFeelPage
