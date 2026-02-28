import '../styles/navbar.css'

type NavbarProps = {
    showModal: boolean
    handleModalToggle: () => void
}

const Navbar = ()=>{
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
            </div>
        </nav>
    )
}

export default Navbar