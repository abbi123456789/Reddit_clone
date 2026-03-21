import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CommunityModalForm from "../components/CommunityModal";
import PostBody from "../components/post/PostBody";
import '../styles/postdetail.css'
import CommunityRightSideBar from "../components/community/CommunityRightSideBar";

type PostDetailPageProps = {
    showModal: boolean
    handleModalToggle: () => void
}

const PostDetail = ({handleModalToggle, showModal}: PostDetailPageProps) => {
    return (
        <main className="post-detail-container">
            <Navbar />
            <div className="main-content">
                <Sidebar handleModalToggle = {handleModalToggle} showModal = {showModal}/>
                <div className="sub-content">
                    <PostBody />
                    <CommunityRightSideBar />
                </div>
            </div>
            {showModal && <CommunityModalForm handleModalToggle={handleModalToggle} />}
        </main>
    )
}

export default PostDetail;