import Navbar from "../components/Navbar"
import ModeratorSidebar from "../components/Moderator/Sidebar"
import PostFlair from "../components/Moderator/PostFlair"
import CreateNewFlair from "../components/Moderator/CreateNewFlair"
import FlairBackgroundModal from "../components/Moderator/FlairBackgroundModal"
import { useParams } from "react-router-dom"
import { useState } from "react"

const PostFlairPage = ()=>{
    const { communityName } = useParams()
    const [showNewFlair, setShowNewFlair] = useState<boolean>(false)
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const [backgroundColor, setBackgroundColor] = useState(false)
    const [textColor, setTextColor] = useState('black')
    const [hexCode, setHexCode] = useState("#DADADA")
    const [flair, setFlair] = useState<string>('')

    return(
        <main className="relative flex flex-col">
            <Navbar />
            <div className="flex h-screen overflow-y-auto [scrollbar-width:none]">
                <ModeratorSidebar/>
                <div className="m-5 flex flex-1">
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
                    <FlairBackgroundModal 
                        backgroundColor={backgroundColor}
                        setBackgroundColor={setBackgroundColor}
                        hexCode={hexCode}
                        setHexCode={setHexCode}
                        flair={flair}
                        setModalOpen={setModalOpen}
                        communityName={communityName ?? ''}
                        textColor={textColor}
                        setTextColor={setTextColor}
                    />
                )}
            </div>
        </main>
    )
}

export default PostFlairPage
