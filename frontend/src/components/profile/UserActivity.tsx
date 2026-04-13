import {Tabs, TabList, Tab, TabPanels, TabPanel} from '../../components/ui/Tabs'

export function UserActivity () {
    return (
        <Tabs style={{width: '100%'}}>
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
                    <p>Posts content goes here...</p>
                </TabPanel>
                <TabPanel id='comments'>
                    <p>Comments content goes here...</p>
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