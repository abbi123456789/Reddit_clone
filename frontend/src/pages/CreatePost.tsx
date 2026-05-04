import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import CommunityModalForm from "../components/CommunityModal"
import PostCreationForm from "../components/post/PostCreationForm"

type CreatePostPageProps = {
    showModal: boolean
    handleModalToggle: () => void
}

const CreatePost = ({showModal, handleModalToggle} : CreatePostPageProps)=>{
    return (
        <main className="flex w-full flex-col">
            <Navbar />
            <div className="flex">
                <Sidebar handleModalToggle = {handleModalToggle} showModal = {showModal}/>
                <div className="m-5 flex h-screen w-full overflow-auto">
                    <PostCreationForm  />
                    <div className="post-rules">

                    </div>
                </div>
            </div>
            {showModal && <CommunityModalForm handleModalToggle={handleModalToggle} />}
        </main>
    )
}

export default CreatePost
