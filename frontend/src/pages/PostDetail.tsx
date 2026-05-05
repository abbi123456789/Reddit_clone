import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PostBody from "../components/post/PostBody";
import CommunityRightSideBar from "../components/community/CommunityRightSideBar";

const PostDetail = () => {
    return (
        <main className="flex h-screen flex-col overflow-hidden p-5">
            <Navbar />
            <div className="flex min-h-0 min-w-0 flex-1">
                <Sidebar />
                <div className="ml-5 flex h-full w-full flex-1 overflow-y-auto">
                    <PostBody />
                    <CommunityRightSideBar />
                </div>
            </div>
        </main>
    )
}

export default PostDetail;
