import { Link } from 'react-router-dom'
import { Input, SearchField } from 'react-aria-components'

import { useAuth } from '../context/AuthContext'

type NavbarProps = {
    onMenuToggle?: () => void
}

const Navbar = ({ onMenuToggle }: NavbarProps)=>{
    const { isAuthenticated } = useAuth()
    const iconButtonClass = "cursor-pointer rounded-[20px] px-3 py-2 hover:bg-gray-300";
    const authLinkClass = "rounded-[20px] px-3 py-2 font-bold text-white";

    return (
        <nav className="border-b border-gray-300 px-3 py-2 text-[1.6rem] md:px-4 md:py-4 md:text-[1.8rem]">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        {onMenuToggle && (
                            <button
                                type="button"
                                className="flex h-11 w-11 items-center justify-center rounded-full text-[2.4rem] hover:bg-gray-300 lg:hidden"
                                onClick={onMenuToggle}
                                aria-label="Open navigation menu"
                            >
                                <i className="bi bi-list"></i>
                            </button>
                        )}
                        <div className="font-['Gill_Sans','Gill_Sans_MT',Calibri,'Trebuchet_MS',sans-serif] text-[3.2rem] font-bold text-orange-600 md:text-[4rem]">
                            <p>reddit</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:hidden [&_.bi]:text-[2rem]">
                        {isAuthenticated ? (
                        <>
                            <div className={iconButtonClass}>
                                <i className="bi bi-badge-ad"></i>
                            </div>
                            <div className={iconButtonClass}>
                                <i className="bi bi-chat-dots"></i>
                            </div>
                            <div className={iconButtonClass}>
                                <Link to='/submit' className="flex items-center gap-2 text-black">
                                    <i className="bi bi-plus-square"></i>
                                </Link>
                            </div>
                            <div className={iconButtonClass}>
                                <i className="bi bi-bell"></i>
                            </div>
                            <div className={iconButtonClass}>
                                <i className="bi bi-person"></i>
                            </div>
                        </>
                        ) : (
                        <>
                            <div className={`${authLinkClass} bg-slate-500 text-[1.4rem]`}>
                                <Link to='/register' replace>
                                    <span>Sign Up</span>
                                </Link>
                            </div>
                            <div className={`${authLinkClass} bg-orange-600 text-[1.4rem]`}>
                                <Link to='/login' replace>
                                    <span>Log In</span>
                                </Link>
                            </div>
                        </>
                        )}
                    </div>
                </div>
                <div className="flex w-full rounded-[30px] border-2 border-orange-600 p-1 text-[2.4rem] md:max-w-[700px] md:flex-1 md:text-[3rem]">
                    <i className="bi bi-reddit"></i>
                    <SearchField aria-label="Search Reddit" className="flex grow">
                        <Input className="grow border-0 outline-none" placeholder="Find Anything" />
                    </SearchField>
                </div>
                <div className="ml-auto hidden items-center gap-4 md:flex md:[&_.bi]:text-[2.2rem]">
                    {isAuthenticated ? (
                    <>
                        <div className={iconButtonClass}>
                            <i className="bi bi-badge-ad"></i>
                        </div>
                        <div className={iconButtonClass}>
                            <i className="bi bi-chat-dots"></i>
                        </div>
                        <div className={iconButtonClass}>
                            <Link to='/submit' className="flex items-center gap-2 text-black">
                                <i className="bi bi-plus-square"></i>
                                <p>create</p>
                            </Link>
                        </div>
                        <div className={iconButtonClass}>
                            <i className="bi bi-bell"></i>
                        </div>
                        <div className={iconButtonClass}>
                            <i className="bi bi-person"></i>
                        </div>
                    </>
                    ) : (
                    <>
                    <div className={`${authLinkClass} bg-slate-500 text-[1.6rem]`}>
                        <Link to='/register' replace>
                            <span>Sign Up</span>
                        </Link>
                    </div>

                    <div className={`${authLinkClass} bg-orange-600 text-[1.6rem]`}>
                        <Link to='/login' replace>
                            <span>Log In</span>
                        </Link>
                    </div>
                    </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
