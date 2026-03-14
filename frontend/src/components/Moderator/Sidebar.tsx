import '../../styles/moderatorsidebar.css'

const ModeratorSidebar = ()=>{
    return (
        <aside className="moderator-sidebar">
            <div className='exit-link'>
                <i className="bi bi-arrow-left"></i>
                <span>Exit mod tools</span>
            </div>

            <div className='select-community'>
                <select>
                    <option value='r/community1'>r/community1</option>
                    <option value='r/community2'>r/community2</option>
                    <option value='r/community3'>r/community3</option>
                    <option value='r/community4'>r/community4</option>
                </select>
            </div>

            <div className='search-tools'>
                <input type='text' placeholder='search-tools' />
            </div>

            <div className='mod-overview'>
                <div className='heading'>
                    <span>Overview</span>
                </div>

                <div className='overview-actions'>
                    <div>
                        <span>Queues</span>
                    </div>
                    <div>
                        <span>Mod Mail</span>
                    </div>
                    <div>
                        <span>Scheduled Posts and Events</span>
                    </div>
                    <div>
                        <span>Restricted Users</span>
                    </div>
                    <div>
                        <span>Mods & Members</span>
                    </div>
                    <div>
                        <span>Insights</span>
                    </div>
                </div>
            </div>

            <div className='moderation'>
                <div className='heading'>
                    <span>Moderation</span>
                </div>

                <div className='moderation-actions'>
                    <div>
                        <span>Rules</span>
                    </div>
                    <div>
                        <span>Saved Responses</span>
                    </div>
                    <div>
                        <span>Mod Log</span>
                    </div>
                    <div>
                        <span>Automod</span>
                    </div>
                    <div>
                        <span>Safety Filters</span>
                    </div>
                    <div>
                        <span>Automations</span>
                    </div>
                </div>
            </div>

            <div className='wiki'>
                <div className='heading'>
                    <span>Wiki</span>
                </div>

                <div className='wiki-actions'>
                    <div>
                        <span>Wiki Activity</span>
                    </div>
                    <div>
                        <span>Wiki Settings</span>
                    </div>
                    <div>
                        <span>Launch Wiki</span>
                    </div>
                </div>
            </div>

            <div className='mod-community-apps'>
                <div className='heading'>
                    <span>Community Apps</span>
                </div>

                <div className='community-apps-actions'>
                    <div>
                        <span>Installed Apps</span>
                    </div>
                    <div>
                        <span>Browse Apps</span>
                    </div>
                </div>
            </div>

            <div className='mod-settings'>
                <div className='heading'>
                    <span>Settings</span>
                </div>

                <div className='settings-actions'>
                    <div>
                        <span>General settings</span>
                    </div>
                    <div>
                        <span>Posts & Comments</span>
                    </div>
                    <div>
                        <span>Look and Feel</span>
                    </div>
                    <div>
                        <span>Community Guide</span>
                    </div>
                    <div>
                        <span>Notifications</span>
                    </div>
                </div>
            </div>

            <div className='mod-rules'>
                <div className='heading'>
                    <span>Rules</span>
                </div>

                <div className='rules-actions'>
                    <div>
                        <span>Reddit for Community</span>
                    </div>
                    <div>
                        <span>Mod Help Center</span>
                    </div>
                    <div>
                        <span>Mod Code of Conduct</span>
                    </div>
                    <div>
                        <span>Mod Support</span>
                    </div>
                    <div>
                        <span>Mod Help</span>
                    </div>
                    <div>
                        <span>Contact Reddit</span>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default ModeratorSidebar;