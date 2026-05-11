import { useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import CommunityHeader from "../components/community/CommunityHeader"
import CommunityRightSideBar from "../components/community/CommunityRightSideBar"
import CommunityPosts from "../components/community/CommunityPosts"
import MobileSidebarDrawer from "../components/MobileSidebarDrawer"
import { appContentClass, appShellClass, scrollContentClass } from "../styles/theme"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { joinCommunity } from "../services/community"

const CommunityPage = ()=>{
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    const queryClient = useQueryClient();
    
    // const joinCommunityMutation = useMutation({
    //     mutationFn: async (communityName: string) => {
    //         await joinCommunity(communityName)
    //     },
    //     onSettled: () => {
    //         queryClient.invalidateQueries({queryKey: ['community', 'joined']})
    //     }
    // })

    return (
        <main className={appShellClass}>
            <Navbar onMenuToggle={() => setIsMobileSidebarOpen(true)} />
            <div className={appContentClass}>
                <div className="hidden shrink-0 lg:flex">
                    <Sidebar />
                </div>
                <div className={`${scrollContentClass} flex-col`}>
                    <CommunityHeader />
                    <div className="flex min-h-0 min-w-0 flex-1 lg:gap-8">
                        <CommunityPosts />
                        <div className="hidden min-w-[280px] max-w-[360px] flex-[2] lg:block">
                            <CommunityRightSideBar />
                        </div>
                    </div>
                </div>
            </div>
            <MobileSidebarDrawer
                isOpen={isMobileSidebarOpen}
                onClose={() => setIsMobileSidebarOpen(false)}
            />
        </main>
    )
}

export default CommunityPage
