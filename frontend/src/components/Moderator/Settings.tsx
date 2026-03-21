type SettingsRowProps = {
    title: string;
    subtitle?: string;
    value?: string;
    type?: 'link' | 'toggle';
    disabled?: boolean;
    external?: boolean;
}


const SettingsRow = ({ title, subtitle, value, type = "link", disabled = false, external = false } :SettingsRowProps) => {
  return (
    <div className={`settings-row ${disabled ? 'disabled' : ''}`}>
      <div className="text-container">
        <h3 className="row-title">{title}</h3>
        {subtitle && (
          <p className="row-subtitle">
            {subtitle} {title === "Community achievements" && <a href="#" className="inline-link">Learn more.</a>}
          </p>
        )}
      </div>
      
      <div className="action-container">
        {value && <span className="row-value">{value}</span>}
        
        {type === "link" && !external && (
          <div className="chevron-icon">
            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.293 4.707L12.586 10l-5.293 5.293 1.414 1.414L15.414 10 8.707 3.293z" />
            </svg>
          </div>
        )}

        {external && (
          <div className="external-icon">
            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path d="M16 10.5V15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4.5v1H5v10h10v-4.5h1ZM10.5 4h5.5v5.5h-1V5.707l-5.646 5.647-.708-.708L14.293 5H10.5V4Z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
const GeneralSettings = () => {
  return (
    <div className="container">
      <h1 className="main-title">Settings</h1>

      <div className="tabs-container">
        <button className="tab active">General</button>
        <button className="tab">Privacy & Discovery</button>
        <button className="tab">Notifications</button>
      </div>

      <div className="settings-list">
        <SettingsRow title="Display name" value="iojoihihuj" />
        <SettingsRow title="Description" value="uhuiuihuihoihiojoihouuhiuhuhiuhiu" />
        <SettingsRow title="Welcome message" />
        <SettingsRow title="Comment threads" />
        
        <SettingsRow 
          title="Community achievements" 
          subtitle="Allow members to unlock badges based on their accomplishments."
          value="Off"
          disabled={true}
        />

        <SettingsRow 
          title="Wiki" 
          subtitle="Resources to benefit members and moderators"
          external={true}
        />
      </div>
    </div>
  );
}

export default GeneralSettings