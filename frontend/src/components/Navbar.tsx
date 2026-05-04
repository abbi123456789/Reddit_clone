import { Link } from 'react-router-dom'
import { Input, SearchField } from 'react-aria-components'

import { useAuth } from '../context/AuthContext'

const Navbar = ()=>{
    const { isAuthenticated } = useAuth()
    const iconButtonClass = "cursor-pointer rounded-[20px] px-3 py-2 hover:bg-gray-300";
    const authLinkClass = "rounded-[20px] px-3 py-2 font-bold text-white";

    return (
        <nav className="flex h-[60px] items-center justify-between border-b border-gray-300 p-4 text-[1.8rem]">
            <div className="font-['Gill_Sans','Gill_Sans_MT',Calibri,'Trebuchet_MS',sans-serif] text-[4rem] font-bold text-orange-600">
                <p>reddit</p>
            </div>
            <div className="flex max-w-[700px] grow rounded-[30px] border-2 border-orange-600 p-1 text-[3rem]">
                <i className="bi bi-reddit"></i>
                <SearchField aria-label="Search Reddit" className="flex grow">
                    <Input className="grow border-0 outline-none" placeholder="Find Anything" />
                </SearchField>
            </div>
            <div className="flex items-center gap-4 [&_.bi]:text-[2.2rem]">
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
                <div className={`${authLinkClass} bg-slate-500`}>
                    <Link to='/register' replace>
                        <span>Sign Up</span>
                    </Link>
                </div>

                <div className={`${authLinkClass} bg-orange-600`}>
                    <Link to='/login' replace>
                        <span>Log In</span>
                    </Link>
                </div>
                </>
                )}
            </div>
        </nav>
    )
}

export default Navbar
