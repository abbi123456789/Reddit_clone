import { Button, Link } from 'react-aria-components';
import { panelClass, tabButtonClass } from '../../styles/theme';

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
    <div className={`flex min-h-12 items-center justify-between py-4 ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}>
      <div className="flex-1">
        <h3 className={`m-0 text-[16px] font-normal ${disabled ? 'text-slate-400' : 'text-slate-900'}`}>{title}</h3>
        {subtitle && (
          <p className="mt-1 mb-0 text-[12px] text-slate-500">
            {subtitle} {title === "Community achievements" && <Link href="#" className="text-orange-700 hover:underline">Learn more.</Link>}
          </p>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        {value && <span className="max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap text-right text-[14px] text-slate-500">{value}</span>}
        
        {type === "link" && !external && (
          <div>
            <svg className="h-5 w-5 fill-slate-900" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.293 4.707L12.586 10l-5.293 5.293 1.414 1.414L15.414 10 8.707 3.293z" />
            </svg>
          </div>
        )}

        {external && (
          <div>
            <svg className="h-5 w-5 fill-slate-900" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path d="M16 10.5V15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4.5v1H5v10h10v-4.5h1ZM10.5 4h5.5v5.5h-1V5.707l-5.646 5.647-.708-.708L14.293 5H10.5V4Z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
const GeneralSettings = () => {
  const tabClass = `${tabButtonClass} text-[16px]`;

  return (
    <div className={`${panelClass} w-full font-sans`}>
      <h1 className="mb-8 text-[28px] font-bold text-slate-900">Settings</h1>

      <div className="mb-8 flex gap-8 border-b-2 border-slate-200">
        <Button className={`${tabClass} text-slate-900 after:absolute after:inset-x-0 after:bottom-[-2px] after:h-0.5 after:bg-orange-600 after:content-['']`}>General</Button>
        <Button className={tabClass}>Privacy & Discovery</Button>
        <Button className={tabClass}>Notifications</Button>
      </div>

      <div className="flex flex-col gap-2">
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
