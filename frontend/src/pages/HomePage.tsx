import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import CommunityModalForm from "../components/CommunityModal"
import FeedPosts from "../components/FeedPosts"
import RecentPosts from "../components/post/RecentPosts"

type HomePageProps = {
    showModal: boolean
    handleModalToggle: () => void
}

const HomePage = ({showModal, handleModalToggle} : HomePageProps)=>{
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

    useEffect(() => {
        if (!isMobileSidebarOpen) {
            return
        }

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsMobileSidebarOpen(false)
            }
        }

        document.body.style.overflow = "hidden"
        window.addEventListener("keydown", handleEscape)

        return () => {
            document.body.style.overflow = ""
            window.removeEventListener("keydown", handleEscape)
        }
    }, [isMobileSidebarOpen])

    return (
        <main className="flex h-screen flex-col overflow-hidden">
            <Navbar onMenuToggle={() => setIsMobileSidebarOpen(true)} />
            <div className="flex min-h-0 flex-1">
                <div className="hidden shrink-0 lg:flex">
                    <Sidebar
                        handleModalToggle = {handleModalToggle}
                        showModal = {showModal}
                    />
                </div>
                <div className="flex min-h-0 min-w-0 flex-1 px-3 py-4 md:px-5 md:py-5 lg:gap-8">
                    <FeedPosts />
                    <div className="hidden lg:block">
                        <RecentPosts />
                    </div>
                </div>
            </div>
            {isMobileSidebarOpen && (
                <div className="fixed inset-0 z-50 flex lg:hidden">
                    <button
                        type="button"
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setIsMobileSidebarOpen(false)}
                        aria-label="Close navigation menu"
                    />
                    <div className="relative z-10 h-full w-[280px] max-w-[85vw] bg-white shadow-xl">
                        <div className="flex items-center justify-between border-b border-gray-300 px-4 py-3">
                            <p className="text-[1.8rem] font-semibold">Menu</p>
                            <button
                                type="button"
                                className="flex h-10 w-10 items-center justify-center rounded-full text-[2rem] hover:bg-gray-200"
                                onClick={() => setIsMobileSidebarOpen(false)}
                                aria-label="Close navigation menu"
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                        <Sidebar
                            handleModalToggle = {handleModalToggle}
                            showModal = {showModal}
                            bordered={false}
                            fullWidth={true}
                        />
                    </div>
                </div>
            )}
            {showModal && <CommunityModalForm handleModalToggle={handleModalToggle} />}
        </main>
    )
}

export default HomePage
