import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CommunityModalForm from "../components/CommunityModal";
import PostBody from "../components/post/PostBody";
import CommunityRightSideBar from "../components/community/CommunityRightSideBar";

type PostDetailPageProps = {
    showModal: boolean
    handleModalToggle: () => void
}

const PostDetail = ({handleModalToggle, showModal}: PostDetailPageProps) => {
    return (
        <main className="flex h-screen flex-col overflow-hidden p-5">
            <Navbar />
            <div className="flex min-h-0 min-w-0 flex-1">
                <Sidebar handleModalToggle = {handleModalToggle} showModal = {showModal}/>
                <div className="ml-5 flex h-full w-full flex-1 overflow-y-auto">
                    <PostBody />
                    <CommunityRightSideBar />
                </div>
            </div>
            {showModal && <CommunityModalForm handleModalToggle={handleModalToggle} />}
        </main>
    )
}

export default PostDetail;
