type SettingsRowProps = {
    title: string;
    subtitle?: string;
    value?: string;
    type?: 'link' | 'toggle';
    toggleChecked?: boolean;
}

const SettingsRow = ({ title, subtitle, value, type = "link", toggleChecked }:SettingsRowProps) => {
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
            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.293 4.707L12.586 10l-5.293 5.293 1.414 1.414L15.414 10 8.707 3.293z" />
            </svg>
          </div>
        )}

        {type === "toggle" && (
          <label className="toggle-switch">
            <input type="checkbox" defaultChecked={toggleChecked} />
            <span className="slider">
              {toggleChecked && <span className="check-mark">✓</span>}
            </span>
          </label>
        )}
      </div>
    </div>
  );
};

export default function PostsAndComments() {
  return (
    <div className="container">
      <h1 className="main-title">Posts & Comments</h1>

      <SettingsRow 
        title="Post guidelines" 
        subtitle="Describe what posts are preferred in your community"
      />
      <SettingsRow title="Allowed posts" value="All" />
      <SettingsRow title="Who can create AMAs" value="Anyone" />

      <hr className="divider" />

      <SettingsRow title="Title restrictions" value="None" />
      <SettingsRow title="Body" value="Optional" />
      <SettingsRow title="Regex requirements" />
      <SettingsRow title="Link restrictions" value="None" />
      <SettingsRow title="Media in comments" value="All" />

      <SettingsRow 
        title="Require post flair" 
        subtitle="Posts without flair can't be submitted (This is ignored if your community hasn't set up any flair)"
        type="toggle"
        toggleChecked={false}
      />
      <SettingsRow title="Hold content for review" />

      <hr className="divider" />

      <SettingsRow 
        title="Spoiler tag" 
        subtitle="Allow users to tag and blur spoiler content"
        type="toggle"
        toggleChecked={true}
      />
      <SettingsRow title="Archive old posts" type="toggle" toggleChecked={false} />
    </div>
  );
}