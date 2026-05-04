import { useEffect, useState } from 'react'
import { Input, SearchField } from 'react-aria-components'

import { getMyCommunities } from '../../services/community';
import type { Community } from '../../services/community';
import { AriaSelect } from '../ui/Select';

const ModeratorSidebar = ()=>{
    const [myCommunities, setMyCommunities] = useState<Community[]>([])
    const [selectedCommunity, setSelectedCommunity] = useState('')
    
    useEffect(()=>{
        const fetchCommunities = async () => {
            const communities = await getMyCommunities()
            if(communities){
                setMyCommunities(communities)
            }
        }
        fetchCommunities()
    }, [])

    const sectionClass = "flex flex-col gap-2";
    const headingClass = "font-bold uppercase";
    const actionGroupClass = "flex flex-col gap-1";
    const actionClass = "flex w-fit cursor-pointer rounded-lg px-2.5 py-1 hover:bg-gray-300";

    return (
        <aside className="flex h-screen w-[300px] flex-col gap-5 overflow-auto border-r border-gray-300 pt-2.5 pl-2.5 text-[1.6rem] [scrollbar-width:none]">
            <div className="flex items-center gap-2">
                <i className="bi bi-arrow-left"></i>
                <span>Exit mod tools</span>
            </div>

            <div>
                <AriaSelect
                    ariaLabel="Select moderator community"
                    placeholder="Select a community"
                    selectedKey={selectedCommunity}
                    onSelectionChange={setSelectedCommunity}
                    options={myCommunities.map((community) => ({
                        id: `r/${community.name}`,
                        label: `r/${community.name}`,
                    }))}
                />
            </div>

            <div>
                <SearchField className="flex" aria-label="Search mod tools">
                    <Input className="rounded border border-gray-300 p-1" placeholder='search-tools' />
                </SearchField>
            </div>

            <div className={sectionClass}>
                <div className={headingClass}>
                    <span>Overview</span>
                </div>

                <div className={actionGroupClass}>
                    <div className={actionClass}>
                        <span>Queues</span>
                    </div>
                    <div className={actionClass}>
                        <span>Mod Mail</span>
                    </div>
                    <div className={actionClass}>
                        <span>Scheduled Posts and Events</span>
                    </div>
                    <div className={actionClass}>
                        <span>Restricted Users</span>
                    </div>
                    <div className={actionClass}>
                        <span>Mods & Members</span>
                    </div>
                    <div className={actionClass}>
                        <span>Insights</span>
                    </div>
                </div>
            </div>

            <div className={sectionClass}>
                <div className={headingClass}>
                    <span>Moderation</span>
                </div>

                <div className={actionGroupClass}>
                    <div className={actionClass}>
                        <span>Rules</span>
                    </div>
                    <div className={actionClass}>
                        <span>Saved Responses</span>
                    </div>
                    <div className={actionClass}>
                        <span>Mod Log</span>
                    </div>
                    <div className={actionClass}>
                        <span>Automod</span>
                    </div>
                    <div className={actionClass}>
                        <span>Safety Filters</span>
                    </div>
                    <div className={actionClass}>
                        <span>Automations</span>
                    </div>
                </div>
            </div>

            <div className={sectionClass}>
                <div className={headingClass}>
                    <span>Wiki</span>
                </div>

                <div className={actionGroupClass}>
                    <div className={actionClass}>
                        <span>Wiki Activity</span>
                    </div>
                    <div className={actionClass}>
                        <span>Wiki Settings</span>
                    </div>
                    <div className={actionClass}>
                        <span>Launch Wiki</span>
                    </div>
                </div>
            </div>

            <div className={sectionClass}>
                <div className={headingClass}>
                    <span>Community Apps</span>
                </div>

                <div className={actionGroupClass}>
                    <div className={actionClass}>
                        <span>Installed Apps</span>
                    </div>
                    <div className={actionClass}>
                        <span>Browse Apps</span>
                    </div>
                </div>
            </div>

            <div className={sectionClass}>
                <div className={headingClass}>
                    <span>Settings</span>
                </div>

                <div className={actionGroupClass}>
                    <div className={actionClass}>
                        <span>General settings</span>
                    </div>
                    <div className={actionClass}>
                        <span>Posts & Comments</span>
                    </div>
                    <div className={actionClass}>
                        <span>Look and Feel</span>
                    </div>
                    <div className={actionClass}>
                        <span>Community Guide</span>
                    </div>
                    <div className={actionClass}>
                        <span>Notifications</span>
                    </div>
                </div>
            </div>

            <div className={sectionClass}>
                <div className={headingClass}>
                    <span>Rules</span>
                </div>

                <div className={actionGroupClass}>
                    <div className={actionClass}>
                        <span>Reddit for Community</span>
                    </div>
                    <div className={actionClass}>
                        <span>Mod Help Center</span>
                    </div>
                    <div className={actionClass}>
                        <span>Mod Code of Conduct</span>
                    </div>
                    <div className={actionClass}>
                        <span>Mod Support</span>
                    </div>
                    <div className={actionClass}>
                        <span>Mod Help</span>
                    </div>
                    <div className={actionClass}>
                        <span>Contact Reddit</span>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default ModeratorSidebar;
