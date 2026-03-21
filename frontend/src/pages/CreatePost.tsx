import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import CommunityModalForm from "../components/CommunityModal"
import PostCreationForm from "../components/post/PostCreationForm"
import '../styles/createpost.css'
import { useParams } from "react-router-dom"

type CreatePostPageProps = {
    showModal: boolean
    handleModalToggle: () => void
}

const CreatePost = ({showModal, handleModalToggle} : CreatePostPageProps)=>{
    const params = useParams()
    console.log(params)
    return (
        <main className="create-post-container">
            <Navbar />
            <div className="main-content">
                <Sidebar handleModalToggle = {handleModalToggle} showModal = {showModal}/>
                <div className="sub-content">
                    <PostCreationForm communityName={params.communityName ? params.communityName : undefined} />
                    <div className="post-rules">

                    </div>
                </div>
            </div>
            {showModal && <CommunityModalForm handleModalToggle={handleModalToggle} />}
        </main>
    )
}

export default CreatePost