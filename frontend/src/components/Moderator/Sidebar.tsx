import { useEffect, useState } from 'react'
import { Input, SearchField } from 'react-aria-components'
import { Link, useParams } from 'react-router-dom';
import { getMyCommunities } from '../../services/community';
import type { Community } from '../../services/community';
import { AriaSelect } from '../ui/Select';

type SidebarItem = {
    label: string;
    to?: string;
};

type SidebarSection = {
    title: string;
    items: SidebarItem[];
};

const ModeratorSidebar = ()=>{
    const { communityName } = useParams();
    const [myCommunities, setMyCommunities] = useState<Community[]>([])
    const [selectedCommunity, setSelectedCommunity] = useState(communityName || "")
    
    useEffect(()=>{
        const fetchCommunities = async () => {
            const communities = await getMyCommunities()
            if(communities){
                setMyCommunities(communities)
            }
        }
        fetchCommunities()
    }, [])

    useEffect(() => {
        setSelectedCommunity(communityName || "");
    }, [communityName]);

    const getModeratorRoute = (path: string) =>
        `/r/mod/${encodeURIComponent(selectedCommunity)}/${path}`;

    const sections: SidebarSection[] = [
        {
            title: "Overview",
            items: [
                { label: "Queues" },
                { label: "Mod Mail" },
                { label: "Scheduled Posts and Events" },
                { label: "Restricted Users" },
                { label: "Mods & Members" },
                { label: "Insights" },
            ],
        },
        {
            title: "Moderation",
            items: [
                { label: "Rules" },
                { label: "Saved Responses" },
                { label: "Mod Log" },
                { label: "Automod" },
                { label: "Safety Filters" },
                { label: "Automations" },
            ],
        },
        {
            title: "Wiki",
            items: [
                { label: "Wiki Activity" },
                { label: "Wiki Settings" },
                { label: "Launch Wiki" },
            ],
        },
        {
            title: "Community Apps",
            items: [
                { label: "Installed Apps" },
                { label: "Browse Apps" },
            ],
        },
        {
            title: "Settings",
            items: [
                { label: "General settings", to: getModeratorRoute("general-settings") },
                { label: "Posts & Comments", to: getModeratorRoute("posts-and-comments") },
                { label: "Look and Feel", to: getModeratorRoute("look-and-feel") },
                { label: "Community Guide", to: getModeratorRoute("guides") },
                { label: "Notifications" },
            ],
        },
        {
            title: "Rules",
            items: [
                { label: "Reddit for Community" },
                { label: "Mod Help Center" },
                { label: "Mod Code of Conduct" },
                { label: "Mod Support" },
                { label: "Mod Help" },
                { label: "Contact Reddit" },
            ],
        },
    ];

    const sectionClass = "flex flex-col gap-2";
    const headingClass = "px-3 text-[1.2rem] font-bold uppercase tracking-wide text-gray-500";
    const actionGroupClass = "flex flex-col gap-0.5";
    const actionClass = "flex min-h-9 w-full cursor-pointer items-center rounded-md px-3 py-2 text-left text-inherit no-underline transition-colors hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700";

    const renderAction = (item: SidebarItem) => {
        const content = <span className="min-w-0 break-words leading-tight">{item.label}</span>;

        if (item.to) {
            return (
                <Link key={item.label} to={item.to} className={actionClass}>
                    {content}
                </Link>
            );
        }

        return (
            <div key={item.label} className={actionClass}>
                {content}
            </div>
        );
    };

    return (
        <aside className="flex h-screen w-[300px] shrink-0 flex-col gap-5 overflow-auto border-r border-gray-300 px-2.5 py-3 text-[1.6rem] text-gray-900 [scrollbar-width:none]">
            <div className="flex items-center gap-2 px-3">
                <i className="bi bi-arrow-left"></i>
                <span>Exit mod tools</span>
            </div>

            <div className="px-3">
                <AriaSelect
                    ariaLabel="Select moderator community"
                    placeholder="Select a community"
                    selectedKey={selectedCommunity}
                    onSelectionChange={setSelectedCommunity}
                    options={myCommunities.map((community) => ({
                        id: `${community.name}`,
                        label: `r/${community.name}`,
                    }))}
                />
            </div>

            <div className="px-3">
                <SearchField className="flex" aria-label="Search mod tools">
                    <Input className="w-full rounded border border-gray-300 p-1" placeholder='search-tools' />
                </SearchField>
            </div>

            {sections.map((section) => (
                <div key={section.title} className={sectionClass}>
                    <div className={headingClass}>
                        <span>{section.title}</span>
                    </div>

                    <div className={actionGroupClass}>
                        {section.items.map(renderAction)}
                    </div>
                </div>
            ))}
        </aside>
    )
}

export default ModeratorSidebar;
