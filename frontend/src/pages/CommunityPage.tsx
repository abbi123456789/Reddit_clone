import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import CommunityModalForm from "../components/CommunityModal"
import CommunityHeader from "../components/community/CommunityHeader"
import '../styles/communitypage.css'
import CommunityMeta from "../components/community/CommunityMeta"
import CommunityPosts from "../components/community/CommunityPosts"

type CommunityPageProps = {
    showModal: boolean
    handleModalToggle: () => void
}

const CommunityPage = ({showModal, handleModalToggle} : CommunityPageProps)=>{
    return (
        <main className="community-container">
            <Navbar />
            <div className="main-content">
                <Sidebar handleModalToggle = {handleModalToggle} showModal = {showModal}/>
                <div className="sub-content">
                    <CommunityHeader />
                    <div className="community-main-content">
                        <CommunityPosts />
                        <CommunityMeta />
                    </div>
                </div>
            </div>
            {showModal && <CommunityModalForm handleModalToggle={handleModalToggle} />}
        </main>
    )
}

export default CommunityPage