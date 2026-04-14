import {Tabs, TabList, Tab, TabPanels, TabPanel} from '../../components/ui/Tabs'
import { useState, useTransition } from 'react'
import type { Key } from 'react-aria-components'
import PostsTab  from './PostsTab'
import CommentsTab from './CommentsTab'

export function UserActivity () {
    const [activeTab, setActiveTab] = useState<Key>('posts')
    const [isPending, startTransition] = useTransition()

    const handleTabChange = (key: Key) => {
        startTransition(async ()=>{
            setActiveTab(key)
        })
    }
    return (
        <Tabs selectedKey={activeTab} onSelectionChange={handleTabChange} style={{width: '100%'}}>
            <div style={{display: 'flex' }}>
                <TabList>
                    <Tab id='posts'>Posts</Tab>
                    <Tab id='comments'>Comments</Tab>
                    <Tab id='upvoted'>Upvoted</Tab>
                    <Tab id='downvoted'>Downvoted</Tab>
                </TabList>
            </div>
            <TabPanels style={{opacity: isPending ? 0.5 : 1, transition: 'opacity 0.4s linear'}}>
                <TabPanel id='posts'>
                    <PostsTab />
                </TabPanel>
                <TabPanel id='comments'>
                    <CommentsTab />
                </TabPanel>
                <TabPanel id='upvoted'>
                    <p>Upvoted content goes here...</p>
                </TabPanel>
                <TabPanel id='downvoted'>
                    <p>Downvoted content goes here...</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}