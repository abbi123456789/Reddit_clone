import Navbar from "../components/Navbar"
import ModeratorSidebar from "../components/Moderator/Sidebar"
import CommunityGuides from "../components/Moderator/Guides"
import '../styles/moderatorguides.css'

const ModeratorGuides = ()=>{
    return(
        <main className="community-container">
            <Navbar />
            <div className="main-content">
                <ModeratorSidebar/>
                <div className="sub-content">
                    <CommunityGuides />
                </div>
            </div>
        </main>
    )
}

export default ModeratorGuides