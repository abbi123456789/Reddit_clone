import '../styles/sidebar.css'

const Sidebar = ()=>{
    return (
        <aside className="sidebar">
            <div className="post-options">
                <div className="home">
                    <i className="bi bi-house-door-fill"></i>
                    <span>Home</span>
                </div>
                <div className="popular">
                    <i className="bi bi-graph-up-arrow"></i>
                    <span>Popular</span>
                </div>
                <div className="news">
                    <i className="bi bi-newspaper"></i>
                    <span>News</span>
                </div>
                <div className="explore">
                    <i className="bi bi-boxes"></i>
                    <span>Explore</span>
                </div>
                <div className="start-community">
                    <i className="bi bi-plus-lg"></i>
                    <span>Start a Community</span>
                </div>
            </div>

            <div className="moderator-options">
                <div className="mod-queue">
                    <i className="bi bi-text-left"></i>
                    <span>Mod Queue</span>
                </div>
                <div className="mod-mail">
                    <i className="bi bi-envelope"></i>
                    <span>Mod Mail</span>
                </div>
                <div className="mod-community">
                    <i className="bi bi-text-left"></i>
                    <span>r/Mod</span>
                </div>
                <div className="manage">
                    <i className="bi bi-gear"></i>
                    <span>Manage</span>
                </div>
            </div>

            <div className='resources'>
                <div className='about-reddit'>
                    <i className="bi bi-reddit"></i>
                    <span>About Reddit</span>
                </div>
                <div className='advertise'>
                    <i className="bi bi-megaphone"></i>
                    <span>Advertise</span>
                </div>
                <div className='developer-platform'>
                    <i className="bi bi-opencollective"></i>
                    <span>Developer Platform</span>
                </div>
                <div className='reddit-pro'>
                    <i className="bi bi-pie-chart"></i>
                    <span>Reddit Pro</span>
                </div>
                <div className='help'>
                    <i className="bi bi-question-circle"></i>
                    <span>Help</span>
                </div>
                <div className='blog'>
                    <i className="bi bi-book"></i>
                    <span>Blog</span>
                </div>
                <div className='careers'>
                    <i className="bi bi-book"></i>
                    <span>Careers</span>
                </div>
                <div className='press'>
                    <i className="bi bi-fire"></i>
                    <span>Press</span>
                </div>
            </div>

            <div className='rules'>
                <div className='reddit-rules'>
                    <i className="bi bi-book"></i>
                    <span>Reddit Rules</span>
                </div>
                <div className='privacy-policy'>
                    <i className="bi bi-book"></i>
                    <span>Privacy Policy</span>
                </div>
                <div className='user-agreement'>
                    <i className="bi bi-book"></i>
                    <span>User Agreement</span>
                </div>
                <div className='accessibility'>
                    <i className="bi bi-universal-access-circle"></i>
                    <span>Accessibility</span>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;