import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import CommunityModalForm from "../components/CommunityModal"
import PostCreationForm from "../components/post/PostCreationForm"
import '../styles/createpost.css'

type CreatePostPageProps = {
    showModal: boolean
    handleModalToggle: () => void
}

const CreatePost = ({showModal, handleModalToggle} : CreatePostPageProps)=>{
    return (
        <main className="create-post-container">
            <Navbar />
            <div className="main-content">
                <Sidebar handleModalToggle = {handleModalToggle} showModal = {showModal}/>
                <div className="sub-content">
                    <PostCreationForm />
                    <div className="post-rules">

                    </div>
                </div>
            </div>
            {showModal && <CommunityModalForm handleModalToggle={handleModalToggle} />}
        </main>
    )
}

export default CreatePost