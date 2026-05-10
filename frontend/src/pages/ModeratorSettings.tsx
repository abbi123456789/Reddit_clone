import { useState } from "react"
import Navbar from "../components/Navbar"
import MobileModeratorSidebarDrawer from "../components/Moderator/MobileModeratorSidebarDrawer"
import ModeratorSidebar from "../components/Moderator/Sidebar"
import GeneralSettings from "../components/Moderator/Settings"

const ModeratorSettings = ()=>{
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

    return(
        <main className="flex h-screen flex-col overflow-hidden">
            <Navbar onMenuToggle={() => setIsMobileSidebarOpen(true)} />
            <div className="flex min-h-0 min-w-0 flex-1 text-[1.6rem] lg:gap-5">
                <div className="hidden shrink-0 lg:flex">
                    <ModeratorSidebar/>
                </div>
                <div className="flex min-h-0 min-w-0 flex-1 overflow-y-auto px-4 py-5 md:px-5">
                    <GeneralSettings />
                </div>
            </div>
            <MobileModeratorSidebarDrawer
                isOpen={isMobileSidebarOpen}
                onClose={() => setIsMobileSidebarOpen(false)}
            />
        </main>
    )
}

export default ModeratorSettings
