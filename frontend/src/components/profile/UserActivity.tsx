import {Tabs, TabList, Tab, TabPanels, TabPanel} from '../../components/ui/Tabs'
import { Suspense, useState, useTransition } from 'react'
import type { Key } from 'react-aria-components'

export function UserActivity () {
    const [activeTab, setActiveTab] = useState<Key>('posts')
    const [isPending, startTransition] = useTransition()

    const handleTabChange = (key: Key) => {
        startTransition(async ()=>{
            setActiveTab(key)
            await new Promise((resolve)=>setTimeout(resolve, 1000))
            console.log('Hello beautiful.')
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
                    <Suspense fallback={null}>
                        <p>Posts content goes here...</p>
                    </Suspense>
                </TabPanel>
                <TabPanel id='comments'>
                    <Suspense fallback={null}>
                        <p>Comment content goes here...</p>
                    </Suspense>
                </TabPanel>
                <TabPanel id='upvoted'>
                    <Suspense fallback={null}>
                        <p>Upvoted content goes here...</p>
                    </Suspense>
                </TabPanel>
                <TabPanel id='downvoted'>
                    <Suspense fallback={null}>
                        <p>Downvoted content goes here...</p>
                    </Suspense>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}