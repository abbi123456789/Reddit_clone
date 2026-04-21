import { UserActivity } from '../components/profile/UserActivity';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../styles/profilepage.css'

type UserProfilePageProps = {
    showModal: boolean
    handleModalToggle: () => void
}

const UserProfilePage = ({ showModal, handleModalToggle }: UserProfilePageProps) => {
    return (
        <main className="community-container">
            <Navbar />
            <div className="main-content">
                <Sidebar showModal={showModal} handleModalToggle={handleModalToggle} />
                <div className="sub-content">
                    <UserActivity />
                </div>
            </div>
        </main>
    )
}

export default UserProfilePage;