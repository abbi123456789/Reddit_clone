import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import PostCreationForm from "../components/post/PostCreationForm"

const CreatePost = ()=>{
    return (
        <main className="flex w-full flex-col">
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className="m-5 flex h-screen w-full overflow-auto">
                    <PostCreationForm  />
                    <div className="post-rules">

                    </div>
                </div>
            </div>
        </main>
    )
}

export default CreatePost
