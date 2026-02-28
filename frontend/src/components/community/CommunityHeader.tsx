import '../../styles/communityheader.css'

const CommunityHeader = ()=>{
    return (
        <header className="community-header">
            <div className="background-image">
                <img src="/images/bannerBackgroundImage.png" alt="Background Image" />
            </div>
            <section className="community-header-section">
                <div className="community-header-section-wrapper">
                    <div className="community-icon">
                        <div className='community-icon-image'>
                            <img src="/images/communityIcon.jpg" alt="Community Icon" />
                        </div>
                        <div className="community-name">
                            <h1>r/webdev</h1>
                        </div>
                    </div>

                    <div className="community-header-buttons">
                        <div className="create-post">
                            <i className="bi bi-plus-lg"></i>
                            <p>Create Post</p>
                        </div>
                        <div className="notification-status">
                            <i className="bi bi-bell"></i>
                        </div>
                        <div className="join-status">
                            <p>Join</p>
                        </div>
                        <div className="more-options">
                            <i className="bi bi-three-dots"></i>
                        </div>
                    </div>
                </div>
            </section>
        </header>
    )
}

export default CommunityHeader