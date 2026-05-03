import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import CommunityModalForm from "../components/CommunityModal"
import FeedPosts from "../components/FeedPosts"
import '../styles/home.css'

type HomePageProps = {
    showModal: boolean
    handleModalToggle: () => void
}

const HomePage = ({showModal, handleModalToggle} : HomePageProps)=>{
    return (
        <main className="home-container">
            <Navbar />
            <div className="main-content">
                <Sidebar handleModalToggle = {handleModalToggle} showModal = {showModal}/>
                <div className='sub-content'>
                    <FeedPosts />
                </div>
            </div>
            {showModal && <CommunityModalForm handleModalToggle={handleModalToggle} />}
        </main>
    )
}

export default HomePage