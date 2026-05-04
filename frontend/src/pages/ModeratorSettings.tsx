import Navbar from "../components/Navbar"
import ModeratorSidebar from "../components/Moderator/Sidebar"
import GeneralSettings from "../components/Moderator/Settings"

const ModeratorSettings = ()=>{
    return(
        <main className="flex h-screen flex-col overflow-hidden">
            <Navbar />
            <div className="flex min-h-0 flex-1 gap-5 text-[1.6rem]">
                <ModeratorSidebar/>
                <div className="flex min-h-0 min-w-0 flex-1 p-5">
                    <GeneralSettings />
                </div>
            </div>
        </main>
    )
}

export default ModeratorSettings
