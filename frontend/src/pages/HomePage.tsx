import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import CommunityModalForm from "../components/CommunityModal"
import FeedPosts from "../components/FeedPosts"

type HomePageProps = {
    showModal: boolean
    handleModalToggle: () => void
}

const HomePage = ({showModal, handleModalToggle} : HomePageProps)=>{
    return (
        <main className="flex h-screen flex-col">
            <Navbar />
            <div className="flex flex-1 gap-8">
                <Sidebar handleModalToggle = {handleModalToggle} showModal = {showModal}/>
                <div className="px-2.5 py-5">
                    <FeedPosts />
                </div>
            </div>
            {showModal && <CommunityModalForm handleModalToggle={handleModalToggle} />}
        </main>
    )
}

export default HomePage
