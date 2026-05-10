import { Link } from 'react-router-dom'
import { Button, Input, SearchField } from 'react-aria-components'

import { useAuth } from '../context/AuthContext'
import { iconButtonClass, primaryButtonClass, secondaryButtonClass } from '../styles/theme'

type NavbarProps = {
    onMenuToggle?: () => void
}

const Navbar = ({ onMenuToggle }: NavbarProps)=>{
    const { isAuthenticated } = useAuth()
    const navIconClass = `${iconButtonClass} h-auto w-auto px-3 py-2`;
    return (
        <nav className="border-b border-slate-200 bg-white px-3 py-2 text-[1.6rem] shadow-[0_1px_0_rgba(15,23,42,0.03)] md:px-4 md:py-4 md:text-[1.8rem]">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        {onMenuToggle && (
                            <Button
                                className={`${iconButtonClass} h-11 w-11 text-[2.4rem] lg:hidden`}
                                onPress={onMenuToggle}
                                aria-label="Open navigation menu"
                            >
                                <i className="bi bi-list"></i>
                            </Button>
                        )}
                        <div className="font-['Gill_Sans','Gill_Sans_MT',Calibri,'Trebuchet_MS',sans-serif] text-[3.2rem] font-bold text-orange-600 md:text-[4rem]">
                            <p>reddit</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:hidden [&_.bi]:text-[2rem]">
                        {isAuthenticated ? (
                        <>
                            <div className={navIconClass}>
                                <i className="bi bi-badge-ad"></i>
                            </div>
                            <div className={navIconClass}>
                                <i className="bi bi-chat-dots"></i>
                            </div>
                            <div className={navIconClass}>
                                <Link to='/submit' className="flex items-center gap-2 text-slate-900">
                                    <i className="bi bi-plus-square"></i>
                                </Link>
                            </div>
                            <div className={navIconClass}>
                                <i className="bi bi-bell"></i>
                            </div>
                            <div className={navIconClass}>
                                <i className="bi bi-person"></i>
                            </div>
                        </>
                        ) : (
                        <>
                            <div>
                                <Link to='/register' replace>
                                    <span className={`${secondaryButtonClass} block text-[1.4rem]`}>Sign Up</span>
                                </Link>
                            </div>
                            <div>
                                <Link to='/login' replace>
                                    <span className={`${primaryButtonClass} block text-[1.4rem]`}>Log In</span>
                                </Link>
                            </div>
                        </>
                        )}
                    </div>
                </div>
                <div className="flex w-full rounded-[30px] border border-orange-200 bg-orange-50/60 p-1 text-[2.4rem] focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 md:max-w-[700px] md:flex-1 md:text-[3rem]">
                    <i className="bi bi-reddit"></i>
                    <SearchField aria-label="Search Reddit" className="flex grow">
                        <Input className="grow border-0 bg-transparent px-2 text-slate-900 outline-none placeholder:text-slate-500" placeholder="Find Anything" />
                    </SearchField>
                </div>
                <div className="ml-auto hidden items-center gap-4 md:flex md:[&_.bi]:text-[2.2rem]">
                    {isAuthenticated ? (
                    <>
                        <div className={navIconClass}>
                            <i className="bi bi-badge-ad"></i>
                        </div>
                        <div className={navIconClass}>
                            <i className="bi bi-chat-dots"></i>
                        </div>
                        <div className={navIconClass}>
                            <Link to='/submit' className="flex items-center gap-2 text-slate-900">
                                <i className="bi bi-plus-square"></i>
                                <p>create</p>
                            </Link>
                        </div>
                        <div className={navIconClass}>
                            <i className="bi bi-bell"></i>
                        </div>
                        <div className={navIconClass}>
                            <i className="bi bi-person"></i>
                        </div>
                    </>
                    ) : (
                    <>
                    <div>
                        <Link to='/register' replace>
                            <span className={`${secondaryButtonClass} block text-[1.6rem]`}>Sign Up</span>
                        </Link>
                    </div>

                    <div>
                        <Link to='/login' replace>
                            <span className={`${primaryButtonClass} block text-[1.6rem]`}>Log In</span>
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
