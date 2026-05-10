import { Button, Checkbox } from 'react-aria-components';
import { cardClass, panelClass, primaryButtonClass, switchSliderClass, tabButtonClass } from '../../styles/theme';

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
    <div className="flex min-h-12 flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <h3 className="m-0 text-[16px] font-normal text-slate-900">{title}</h3>
        {subtitle && <p className="mt-1 mb-0 text-[12px] text-slate-500">{subtitle}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-3 sm:justify-end">
        {value && <span className="text-[14px] text-slate-500">{value}</span>}
        {type === "link" && (
          <div>
            <svg className="h-5 w-5 fill-slate-900" viewBox="0 0 20 20" fill="currentColor"><path d="M7.293 4.707L12.586 10l-5.293 5.293 1.414 1.414L15.414 10 8.707 3.293z" /></svg>
          </div>
        )}
        {type === "toggle" && (
          <Checkbox className="group relative inline-block h-8 w-[50px]" defaultSelected={toggleChecked} aria-label={title}>
            <span className={switchSliderClass}>
              {toggleChecked && <span className="text-[14px] font-bold text-white">✓</span>}
            </span>
          </Checkbox>
        )}
      </div>
    </div>
  );
};

const CommunityGuides = () => {
  const tabClass = `${tabButtonClass} shrink-0 text-[14px]`;

  return (
    <div className={`${panelClass} w-full min-w-0`}>
      {/* Tabs Navigation */}
      <div className="mb-5 flex gap-5 overflow-x-auto border-b border-slate-200 [scrollbar-width:none] md:gap-[30px]">
        <Button className={`${tabClass} text-slate-900 after:absolute after:inset-x-0 after:bottom-[-1px] after:h-0.5 after:bg-orange-600 after:content-['']`}>Community Guide</Button>
        <Button className={tabClass}>Mod Guide</Button>
        <Button className={tabClass}>Training Queue</Button>
      </div>

      <div className="mt-[30px] flex flex-col gap-8 xl:flex-row xl:gap-[60px]">
        {/* Left Column: Settings */}
        <div className="min-w-0 flex-[1.2]">
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
        <div className="w-full max-w-[420px] flex-[0.8] self-center xl:self-start">
          <div className={`${cardClass} overflow-hidden rounded-[18px]`}>
            <div className="relative h-[140px] overflow-hidden bg-orange-50">
              {/* Abstract shapes representing the background art */}
              <div className="absolute left-2.5 top-2.5 h-[60px] w-[100px] rounded-[30px] bg-orange-100"></div>
              <div className="absolute right-10 top-2.5 h-20 w-20 rounded-xl bg-slate-200"></div>
              <div className="absolute bottom-2.5 left-2.5 h-10 w-[120px] rounded-[20px] bg-white"></div>
              <div className="absolute right-2.5 bottom-[-10px] h-[90px] w-[60px] rounded-[20px] bg-orange-200"></div>
            </div>
            
            <div className="p-5 text-center">
              <div className="relative mt-[-40px] inline-block rounded-[20px] border-4 border-white bg-orange-600 px-4 py-1.5 text-[18px] font-extrabold text-white">r/iojoihihuj</div>
              <div className="my-5 mb-2.5 rounded-xl bg-slate-100 p-4 text-left text-[13px] leading-[1.4]">
                <p>👋 Welcome u/Traditional_Tear_603! We're just getting started - share a post or comment to help shape this community into something great!</p>
              </div>
              <p className="mb-5 text-left text-[12px] text-slate-500">- r/iojoihihuj Mod Team</p>
              <Button className={`${primaryButtonClass} w-full p-3`}>Got It</Button>
              <p className="mt-3 text-[11px] text-slate-500">Access the community guide any time in the sidebar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityGuides
