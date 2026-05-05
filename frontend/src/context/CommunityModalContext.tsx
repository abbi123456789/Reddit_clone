import React from "react"
import type { ReactNode } from "react"

import CommunityModalForm from "../components/CommunityModal"

type CommunityModalContextType = {
    isCommunityModalOpen: boolean
    openCommunityModal: () => void
    closeCommunityModal: () => void
    toggleCommunityModal: () => void
}

const CommunityModalContext = React.createContext<CommunityModalContextType | undefined>(undefined)

export const CommunityModalProvider = ({ children }: { children: ReactNode }) => {
    const [isCommunityModalOpen, setIsCommunityModalOpen] = React.useState(false)

    const openCommunityModal = () => {
        setIsCommunityModalOpen(true)
    }

    const closeCommunityModal = () => {
        setIsCommunityModalOpen(false)
    }

    const toggleCommunityModal = () => {
        setIsCommunityModalOpen((prev) => !prev)
    }

    return (
        <CommunityModalContext.Provider
            value={{
                isCommunityModalOpen,
                openCommunityModal,
                closeCommunityModal,
                toggleCommunityModal,
            }}
        >
            {children}
            {isCommunityModalOpen && <CommunityModalForm onClose={closeCommunityModal} />}
        </CommunityModalContext.Provider>
    )
}

export const useCommunityModal = () => {
    const context = React.useContext(CommunityModalContext)

    if (context === undefined) {
        throw new Error("useCommunityModal must be used within a CommunityModalProvider")
    }

    return context
}
