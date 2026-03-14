import { Link } from 'react-router-dom';
import '../../styles/lookandfeel.css'

const LookAndFeel = ()=>{
    return(
        <main className="look-and-feel-container">
            <div className="heading">
                <span>Look and Feel</span>
            </div>
            <div className="actions">
                <div className='community-appearance-action'>
                    <div>
                        <span>Community appearance</span>
                        <p>Customize your community icon, banner image and colors</p>
                    </div>
                    <span>&gt;</span>
                </div>

                <Link to='/community/post-flair' style={{'textDecoration':'none', 'color':'inherit'}}>
                    <div className='post-flair-action'>
                        <div>
                            <span>Post flair</span>
                            <p>Visual tags members of your community can add to their posts.</p>
                        </div>
                        <span>&gt;</span>
                    </div>
                </Link>

                <div className='user-flair-action'>
                    <div>
                        <span>User flair</span>
                        <p>Visual tags members of your community can add to their usernames</p>
                    </div>
                    <span>&gt;</span>
                </div>

                <div className='custom-emoji-action'>
                    <div>
                        <span>Custom emoji</span>
                        <p>Upload custom emoji to use in flair and community status</p>
                    </div>
                    <span>&gt;</span>
                </div>
            </div>
        </main>
    )
}

export default LookAndFeel;