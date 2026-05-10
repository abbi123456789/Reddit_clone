import { UserActivity } from '../components/profile/UserActivity';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { appShellClass } from '../styles/theme';

const UserProfilePage = () => {
    return (
        <main className={appShellClass}>
            <Navbar />
            <div className="flex min-h-0 flex-1 gap-5 bg-slate-50 text-[1.6rem]">
                <Sidebar />
                <div className="flex min-h-0 min-w-0 flex-1">
                    <UserActivity />
                </div>
            </div>
        </main>
    )
}

export default UserProfilePage;
