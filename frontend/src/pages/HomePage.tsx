import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import CommunityModalForm from "../components/CommunityModal"

type HomePageProps = {
    showModal: boolean
    handleModalToggle: () => void
}

const HomePage = ({showModal, handleModalToggle} : HomePageProps)=>{
    return (
        <main className="home-container">
            <Navbar handleModalToggle = {handleModalToggle} showModal = {showModal}/>
            <div className="main-content">
                <Sidebar handleModalToggle = {handleModalToggle} showModal = {showModal}/>
            </div>
            {showModal && <CommunityModalForm handleModalToggle={handleModalToggle} />}
        </main>
    )
}

export default HomePage