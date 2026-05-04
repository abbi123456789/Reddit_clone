import Navbar from "../components/Navbar"
import ModeratorSidebar from "../components/Moderator/Sidebar"
import CommunityGuides from "../components/Moderator/Guides"

const ModeratorGuides = ()=>{
    return(
        <main className="flex h-screen flex-col overflow-hidden">
            <Navbar />
            <div className="flex min-h-0 flex-1 gap-5 text-[1.6rem]">
                <ModeratorSidebar/>
                <div className="flex min-h-0 min-w-0 flex-1 p-5">
                    <CommunityGuides />
                </div>
            </div>
        </main>
    )
}

export default ModeratorGuides
