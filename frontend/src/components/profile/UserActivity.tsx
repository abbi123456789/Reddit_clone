import {Tabs, TabList, Tab, TabPanels, TabPanel} from '../../components/ui/Tabs'
import { Suspense, useState } from 'react'
import type { Key } from 'react-aria-components'
import PostsTab  from './PostsTab'
import CommentsTab from './CommentsTab'
import VotedPostsTab from './VotedPostsTab'

export function UserActivity () {
    const [activeTab, setActiveTab] = useState<Key>('posts')

    const handleTabChange = (key: Key) => {
        setActiveTab(key)
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
            <TabPanels>
                <TabPanel id='posts'>
                    <PostsTab />
                </TabPanel>
                <TabPanel id='comments'>
                    <Suspense fallback={<p>Loading...</p>}>
                        <CommentsTab />
                    </Suspense >
                </TabPanel>
                <TabPanel id='upvoted'>
                    <Suspense fallback={<p>Loading...</p>}>
                        <VotedPostsTab value={1} />
                    </Suspense>
                </TabPanel>
                <TabPanel id='downvoted'>
                    <Suspense fallback={<p>Loading...</p>}>
                        <VotedPostsTab value={-1} />
                    </Suspense>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}