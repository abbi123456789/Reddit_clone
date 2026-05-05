import { useEffect } from "react"
import { Button } from "react-aria-components"

import Sidebar from "./Sidebar"

type MobileSidebarDrawerProps = {
    isOpen: boolean
    onClose: () => void
}

const MobileSidebarDrawer = ({ isOpen, onClose }: MobileSidebarDrawerProps) => {
    useEffect(() => {
        if (!isOpen) {
            return
        }

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose()
            }
        }

        document.body.style.overflow = "hidden"
        window.addEventListener("keydown", handleEscape)

        return () => {
            document.body.style.overflow = ""
            window.removeEventListener("keydown", handleEscape)
        }
    }, [isOpen, onClose])

    if (!isOpen) {
        return null
    }

    return (
        <div className="fixed inset-0 z-50 flex lg:hidden">
            <Button
                className="absolute inset-0 border-0 bg-black/40"
                onPress={onClose}
                aria-label="Close navigation menu"
            />
            <div className="relative z-10 h-full w-[280px] max-w-[85vw] bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-300 px-4 py-3">
                    <p className="text-[1.8rem] font-semibold">Menu</p>
                    <Button
                        className="flex h-10 w-10 items-center justify-center rounded-full border-0 bg-transparent text-[2rem] hover:bg-gray-200"
                        onPress={onClose}
                        aria-label="Close navigation menu"
                    >
                        <i className="bi bi-x-lg"></i>
                    </Button>
                </div>
                <Sidebar
                    bordered={false}
                    fullWidth={true}
                />
            </div>
        </div>
    )
}

export default MobileSidebarDrawer
