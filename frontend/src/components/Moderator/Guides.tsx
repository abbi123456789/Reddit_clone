type SettingsRowProps = {
    title: string;
    subtitle?: string;
    value?: string;
    type?: 'link' | 'toggle';
    toggleChecked?: boolean;
}

// Reusing your SettingsRow component with minor tweaks for icon size
const SettingsRow = ({ title, subtitle, value, type = "link", toggleChecked }: SettingsRowProps) => {
  return (
    <div className="settings-row">
      <div className="text-container">
        <h3 className="row-title">{title}</h3>
        {subtitle && <p className="row-subtitle">{subtitle}</p>}
      </div>
      <div className="action-container">
        {value && <span className="row-value">{value}</span>}
        {type === "link" && (
          <div className="chevron-icon">
            <svg viewBox="0 0 20 20" fill="currentColor"><path d="M7.293 4.707L12.586 10l-5.293 5.293 1.414 1.414L15.414 10 8.707 3.293z" /></svg>
          </div>
        )}
        {type === "toggle" && (
          <label className="toggle-switch">
            <input type="checkbox" defaultChecked={toggleChecked} />
            <span className="slider">{toggleChecked && <span className="check-mark">✓</span>}</span>
          </label>
        )}
      </div>
    </div>
  );
};

const CommunityGuides = () => {
  return (
    <div className="page-wrapper">
      {/* Tabs Navigation */}
      <div className="tabs-container">
        <button className="tab active">Community Guide</button>
        <button className="tab">Mod Guide</button>
        <button className="tab">Training Queue</button>
      </div>

      <div className="main-content">
        {/* Left Column: Settings */}
        <div className="settings-column">
          <SettingsRow 
            title="Enable community guide" 
            subtitle="Appears in the sidebar on desktop and About in the Reddit app."
            type="toggle"
            toggleChecked={true}
          />
          <SettingsRow 
            title="Show when someone joins this community" 
            type="toggle"
            toggleChecked={true}
          />
          <SettingsRow title="Header layout" value="Name and image" />
          <SettingsRow title="Header image" value="Banner" />
          <SettingsRow title="Welcome message" value="👋 Welcome {username}! We're j..." />
          <SettingsRow title="User flair selection" value="Off" />
          <SettingsRow title="Resources" value="0/3" />
        </div>

        {/* Right Column: Preview Card */}
        <div className="preview-column">
          <div className="preview-card">
            <div className="preview-header-art">
              {/* Abstract shapes representing the background art */}
              <div className="art-shape bubble-1"></div>
              <div className="art-shape bubble-2"></div>
              <div className="art-shape bubble-3"></div>
              <div className="art-shape bubble-4"></div>
            </div>
            
            <div className="preview-body">
              <div className="community-badge">r/iojoihihuj</div>
              <div className="message-box">
                <p>👋 Welcome u/Traditional_Tear_603! We're just getting started - share a post or comment to help shape this community into something great!</p>
              </div>
              <p className="mod-team-label">- r/iojoihihuj Mod Team</p>
              <button className="got-it-btn">Got It</button>
              <p className="footer-note">Access the community guide any time in the sidebar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityGuides