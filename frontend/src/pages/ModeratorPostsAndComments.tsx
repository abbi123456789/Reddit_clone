import Navbar from "../components/Navbar"
import ModeratorSidebar from "../components/Moderator/Sidebar"
import PostsAndComments from "../components/Moderator/PostsAndComments"
import '../styles/moderatorpostsandcomments.css'

const ModeratorPostsAndComments = ()=>{
    return(
        <main className="community-container">
            <Navbar />
            <div className="main-content">
                <ModeratorSidebar/>
                <div className="sub-content">
                    <PostsAndComments />
                </div>
            </div>
        </main>
    )
}

export default ModeratorPostsAndComments