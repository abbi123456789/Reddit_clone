import Navbar from "../components/Navbar"
import MobileModeratorSidebarDrawer from "../components/Moderator/MobileModeratorSidebarDrawer"
import ModeratorSidebar from "../components/Moderator/Sidebar"
import PostFlair from "../components/Moderator/PostFlair"
import CreateNewFlair from "../components/Moderator/CreateNewFlair"
import FlairBackgroundModal from "../components/Moderator/FlairBackgroundModal"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { Button, Dialog } from "react-aria-components"
import { appShellClass, scrollContentClass } from "../styles/theme"

const PostFlairPage = ()=>{
    const { communityName } = useParams()
    const [showNewFlair, setShowNewFlair] = useState<boolean>(false)
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const [backgroundColor, setBackgroundColor] = useState(false)
    const [textColor, setTextColor] = useState('black')
    const [hexCode, setHexCode] = useState("#DADADA")
    const [flair, setFlair] = useState<string>('')

    const renderCreateNewFlairForm = () => (
        <CreateNewFlair 
            setShowNewFlair={setShowNewFlair} 
            setModalOpen={setModalOpen}
            backgroundColor = {backgroundColor}
            setBackgroundColor = {setBackgroundColor}
            flair = {flair}
            setFlair = {setFlair}
        />
    )

    return(
        <main className={`${appShellClass} relative`}>
            <Navbar onMenuToggle={() => setIsMobileSidebarOpen(true)} />
            <div className="flex min-h-0 min-w-0 flex-1 bg-slate-50 text-[1.6rem] lg:gap-5">
                <div className="hidden shrink-0 lg:flex">
                    <ModeratorSidebar/>
                </div>
                <div className={`${scrollContentClass} [scrollbar-width:none]`}>
                    <div className="flex min-w-0 flex-1 flex-col gap-6 xl:flex-row">
                        <PostFlair setShowNewFlair={setShowNewFlair}/>
                        {showNewFlair && (
                            <div className="hidden xl:block">
                                {renderCreateNewFlairForm()}
                            </div>
                        )}
                    </div>
                </div>
                {showNewFlair && (
                    <div className="fixed inset-0 z-40 flex items-center justify-center px-4 py-6 xl:hidden">
                        <Button
                            className="absolute inset-0 border-0 bg-black/40"
                            onPress={() => setShowNewFlair(false)}
                            aria-label="Close create flair modal"
                        />
                        <Dialog
                            className="relative z-10 max-h-[85dvh] w-full max-w-[460px] overflow-y-auto rounded-[18px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.25)] outline-none"
                            aria-label="Create flair"
                        >
                            {renderCreateNewFlairForm()}
                        </Dialog>
                    </div>
                )}
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
