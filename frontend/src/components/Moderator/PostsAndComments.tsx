import { Checkbox } from 'react-aria-components';

type SettingsRowProps = {
    title: string;
    subtitle?: string;
    value?: string;
    type?: 'link' | 'toggle';
    toggleChecked?: boolean;
}

const SettingsRow = ({ title, subtitle, value, type = "link", toggleChecked }:SettingsRowProps) => {
  return (
    <div className="flex min-h-12 flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <h3 className="m-0 text-[16px] font-normal text-[#1c1c1c]">{title}</h3>
        {subtitle && <p className="mt-1 mb-0 text-[12px] text-[#7c7c7c]">{subtitle}</p>}
      </div>
      
      <div className="flex shrink-0 items-center gap-3 sm:justify-end">
        {value && <span className="text-[14px] text-[#7c7c7c]">{value}</span>}
        
        {type === "link" && (
          <div>
            <svg className="h-5 w-5 fill-[#1c1c1c]" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.293 4.707L12.586 10l-5.293 5.293 1.414 1.414L15.414 10 8.707 3.293z" />
            </svg>
          </div>
        )}

        {type === "toggle" && (
          <Checkbox className="group relative inline-block h-8 w-[50px] data-[disabled]:opacity-50" defaultSelected={toggleChecked} aria-label={title}>
            <span className="absolute inset-0 flex cursor-pointer items-center justify-end rounded-[34px] bg-[#edeff1] pr-2 transition before:absolute before:bottom-1 before:left-1 before:h-6 before:w-6 before:rounded-full before:bg-white before:shadow-sm before:transition group-data-[selected]:bg-[#0079d3] group-data-[selected]:before:translate-x-[18px]">
              {toggleChecked && <span className="text-[14px] font-bold text-white">✓</span>}
            </span>
          </Checkbox>
        )}
      </div>
    </div>
  );
};

export default function PostsAndComments() {
  return (
    <div className='w-full min-w-0 font-sans'>
      <h1 className="mb-8 text-[24px] font-bold text-[#1c1c1c] md:text-[28px]">Posts & Comments</h1>

      <SettingsRow 
        title="Post guidelines" 
        subtitle="Describe what posts are preferred in your community"
      />
      <SettingsRow title="Allowed posts" value="All" />
      <SettingsRow title="Who can create AMAs" value="Anyone" />

      <hr className="my-4 border-0 border-t border-[#edeff1]" />

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

      <hr className="my-4 border-0 border-t border-[#edeff1]" />

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
