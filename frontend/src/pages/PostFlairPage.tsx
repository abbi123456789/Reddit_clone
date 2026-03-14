import Navbar from "../components/Navbar"
import '../styles/postflairpage.css'
import ModeratorSidebar from "../components/Moderator/Sidebar"
import PostFlair from "../components/Moderator/PostFlair"
import CreateNewFlair from "../components/Moderator/CreateNewFlair"
import FlairBackgroundModal from "../components/Moderator/FlairBackgroundModal"
import { useState } from "react"

const PostFlairPage = ()=>{
    const [showNewFlair, setShowNewFlair] = useState<boolean>(false)
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const [backgroundColor, setBackgroundColor] = useState(false)
    const [hexCode, setHexCode] = useState("#DADADA")
    const [flair, setFlair] = useState<string>('')

    return(
        <main className="post-flair-page-container">
            <Navbar />
            <div className="main-content">
                <ModeratorSidebar/>
                <div className="sub-content">
                    <PostFlair setShowNewFlair={setShowNewFlair}/>
                    {showNewFlair && 
                        <CreateNewFlair 
                            setShowNewFlair={setShowNewFlair} 
                            setModalOpen={setModalOpen}
                            backgroundColor = {backgroundColor}
                            setBackgroundColor = {setBackgroundColor}
                            flair = {flair}
                            setFlair = {setFlair}
                        />
                    }
                </div>
                {isModalOpen && showNewFlair && (
                    <div onClick={(e) => e.stopPropagation()}> {/* Prevents closing when clicking inside */}
                        <FlairBackgroundModal 
                            backgroundColor={backgroundColor}
                            setBackgroundColor={setBackgroundColor}
                            hexCode={hexCode}
                            setHexCode={setHexCode}
                            flair={flair}
                            setModalOpen={setModalOpen}
                        />
                    </div>
                )}
            </div>
        </main>
    )
}

export default PostFlairPage