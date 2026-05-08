import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import PostCreationForm from "../components/post/PostCreationForm"

const CreatePost = ()=>{
    return (
        <main className="flex h-screen w-full flex-col overflow-hidden">
            <Navbar />
            <div className="flex min-h-0 flex-1">
                <div className="min-h-0 w-[300px] shrink-0 overflow-hidden">
                    <Sidebar />
                </div>
                <div className="flex min-h-0 min-w-0 flex-1 p-5">
                    <PostCreationForm  />
                    <div className="post-rules">

                    </div>
                </div>
            </div>
        </main>
    )
}

export default CreatePost
