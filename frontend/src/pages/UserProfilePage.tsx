import { UserActivity } from '../components/profile/UserActivity';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

type UserProfilePageProps = {
    showModal: boolean
    handleModalToggle: () => void
}

const UserProfilePage = ({ showModal, handleModalToggle }: UserProfilePageProps) => {
    return (
        <main className="flex h-screen flex-col overflow-hidden">
            <Navbar />
            <div className="flex min-h-0 flex-1 gap-5 text-[1.6rem]">
                <Sidebar showModal={showModal} handleModalToggle={handleModalToggle} />
                <div className="flex min-h-0 min-w-0 flex-1">
                    <UserActivity />
                </div>
            </div>
        </main>
    )
}

export default UserProfilePage;
