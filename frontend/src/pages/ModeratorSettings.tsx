import Navbar from "../components/Navbar"
import ModeratorSidebar from "../components/Moderator/Sidebar"
import GeneralSettings from "../components/Moderator/Settings"
import '../styles/moderatorsettings.css'

const ModeratorSettings = ()=>{
    return(
        <main className="community-container">
            <Navbar />
            <div className="main-content">
                <ModeratorSidebar/>
                <div className="sub-content">
                    <GeneralSettings />
                </div>
            </div>
        </main>
    )
}

export default ModeratorSettings