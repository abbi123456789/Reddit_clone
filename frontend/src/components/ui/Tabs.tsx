import {
  Tabs as RACTabs,
  TabList as RACTabList,
  Tab as RACTab,
  TabPanels as RACTabPanels,
  TabPanel as RACTabPanel,
  composeRenderProps,
  SelectionIndicator,
} from 'react-aria-components';
import type { 
    TabListProps, 
    TabProps, TabsProps, 
    TabPanelProps, 
    TabPanelsProps 
} from 'react-aria-components';
import './Tabs.css';

export function Tabs(props: TabsProps) {
  return <RACTabs {...props} />;
}

export function TabList<T extends object>(props: TabListProps<T>) {
  return <RACTabList {...props} />;
}

export function Tab(props: TabProps) {
  return (
    <RACTab {...props}>
      {composeRenderProps(props.children, children => (<>
        {children}
        <SelectionIndicator />
      </>))}
    </RACTab>
  );
}

export function TabPanels<T extends object>(props: TabPanelsProps<T>) {
  return <RACTabPanels {...props} />;
}

export function TabPanel(props: TabPanelProps) {
  return <RACTabPanel {...props} />;
}
