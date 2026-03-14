import Navbar from "../components/Navbar"
import ModeratorSidebar from "../components/Moderator/Sidebar"
import LookAndFeel from "../components/Moderator/CommunityLookAndFeel"

const LookAndFeelPage = ()=>{
    return(
        <main className="community-container">
            <Navbar />
            <div className="main-content">
                <ModeratorSidebar/>
                <div className="sub-content">
                    <LookAndFeel />
                </div>
            </div>
        </main>
    )
}

export default LookAndFeelPage