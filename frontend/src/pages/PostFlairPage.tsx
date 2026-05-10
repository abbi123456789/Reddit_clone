import Navbar from "../components/Navbar"
import MobileModeratorSidebarDrawer from "../components/Moderator/MobileModeratorSidebarDrawer"
import ModeratorSidebar from "../components/Moderator/Sidebar"
import PostFlair from "../components/Moderator/PostFlair"
import CreateNewFlair from "../components/Moderator/CreateNewFlair"
import FlairBackgroundModal from "../components/Moderator/FlairBackgroundModal"
import { useParams } from "react-router-dom"
import { useState } from "react"

const PostFlairPage = ()=>{
    const { communityName } = useParams()
    const [showNewFlair, setShowNewFlair] = useState<boolean>(false)
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const [backgroundColor, setBackgroundColor] = useState(false)
    const [textColor, setTextColor] = useState('black')
    const [hexCode, setHexCode] = useState("#DADADA")
    const [flair, setFlair] = useState<string>('')

    return(
        <main className="relative flex h-screen flex-col overflow-hidden">
            <Navbar onMenuToggle={() => setIsMobileSidebarOpen(true)} />
            <div className="flex min-h-0 min-w-0 flex-1 text-[1.6rem] lg:gap-5">
                <div className="hidden shrink-0 lg:flex">
                    <ModeratorSidebar/>
                </div>
                <div className="flex min-h-0 min-w-0 flex-1 overflow-y-auto px-4 py-5 md:px-5 [scrollbar-width:none]">
                    <div className="flex min-w-0 flex-1 flex-col gap-6 xl:flex-row">
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
            <MobileModeratorSidebarDrawer
                isOpen={isMobileSidebarOpen}
                onClose={() => setIsMobileSidebarOpen(false)}
            />
        </main>
    )
}

export default PostFlairPage
