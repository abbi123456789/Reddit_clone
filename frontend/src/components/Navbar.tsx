import { Link } from 'react-router-dom'

import '../styles/navbar.css'
import { useAuth } from '../context/AuthContext'

const Navbar = ()=>{
    const { isAuthenticated } = useAuth()
    return (
        <nav className="navbar">
            <div className="project-name">
                <p>reddit</p>
            </div>
            <div className="search-bar">
                <i className="bi bi-reddit"></i>
                <input type="text" placeholder="Find Anything" />
            </div>
            <div className="action-buttons">
                {isAuthenticated ? (
                <>
                    <div className="advertisment-icon">
                        <i className="bi bi-badge-ad"></i>
                    </div>
                    <div className="chat-icon">
                        <i className="bi bi-chat-dots"></i>
                    </div>
                    <div className="create-post-icon">
                        <i className="bi bi-plus-square"></i>
                        <p>create</p>
                    </div>
                    <div className="notification-icon">
                        <i className="bi bi-bell"></i>
                    </div>
                    <div className="profile-icon">
                        <i className="bi bi-person"></i>
                    </div>
                </>
                ) : (
                <>
                <div className='signup-icon'>
                    <Link to='/register' replace>
                        <span style={{color: 'white'}}>Sign Up</span>
                    </Link>
                </div>

                <div className='login-icon'>
                    <Link to='/login' replace>
                        <span style={{color: 'white'}}>Log In</span>
                    </Link>
                </div>
                </>
                )}
            </div>
        </nav>
    )
}

export default Navbar