import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import CommunityModalForm from "../components/CommunityModal"
import CommunityHeader from "../components/community/CommunityHeader"
import CommunityRightSideBar from "../components/community/CommunityRightSideBar"
import CommunityPosts from "../components/community/CommunityPosts"

type CommunityPageProps = {
    showModal: boolean
    handleModalToggle: () => void
}

const CommunityPage = ({showModal, handleModalToggle} : CommunityPageProps)=>{
    return (
        <main className="flex h-screen flex-col">
            <Navbar />
            <div className="flex min-h-0 min-w-0 flex-1">
                <Sidebar handleModalToggle = {handleModalToggle} showModal = {showModal}/>
                <div className="m-5 flex h-full flex-1 flex-col overflow-y-auto">
                    <CommunityHeader />
                    <div className="flex">
                        <CommunityPosts />
                        <CommunityRightSideBar />
                    </div>
                </div>
            </div>
            {showModal && <CommunityModalForm handleModalToggle={handleModalToggle} />}
        </main>
    )
}

export default CommunityPage
