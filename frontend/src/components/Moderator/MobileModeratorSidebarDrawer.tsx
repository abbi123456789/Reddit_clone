import { useEffect } from "react";
import { Button } from "react-aria-components";

import ModeratorSidebar from "./Sidebar";
import { iconButtonClass } from "../../styles/theme";

type MobileModeratorSidebarDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
};

const MobileModeratorSidebarDrawer = ({ isOpen, onClose }: MobileModeratorSidebarDrawerProps) => {
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex lg:hidden">
            <Button
                className="absolute inset-0 border-0 bg-black/40"
                onPress={onClose}
                aria-label="Close moderator tools menu"
            />
            <div className="relative z-10 flex h-full w-[290px] max-w-[88vw] flex-col bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                    <p className="text-[1.8rem] font-semibold">Mod tools</p>
                    <Button
                        className={`${iconButtonClass} text-[2rem]`}
                        onPress={onClose}
                        aria-label="Close moderator tools menu"
                    >
                        <i className="bi bi-x-lg"></i>
                    </Button>
                </div>
                <div className="min-h-0 flex-1">
                    <ModeratorSidebar
                        bordered={false}
                        fullWidth={true}
                        onNavigate={onClose}
                    />
                </div>
            </div>
        </div>
    );
};

export default MobileModeratorSidebarDrawer;
