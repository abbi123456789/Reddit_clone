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

export function Tabs(props: TabsProps) {
  return <RACTabs {...props} className={`flex max-w-full flex-col gap-2 text-[1.6rem] ${props.className ?? ''}`} />;
}

export function TabList<T extends object>(props: TabListProps<T>) {
  return (
    <RACTabList
      {...props}
      className={`flex max-w-full overflow-x-auto overflow-y-clip border-b border-slate-200 [scrollbar-width:none] ${props.className ?? ''}`}
    />
  );
}

export function Tab(props: TabProps) {
  return (
    <RACTab
      {...props}
      className={`relative cursor-default p-2.5 text-slate-500 outline-none transition-colors data-[focus-visible]:rounded-xl data-[focus-visible]:outline-2 data-[focus-visible]:outline-orange-500 data-[hovered]:text-orange-700 data-[selected]:text-slate-900 ${props.className ?? ''}`}
    >
      {composeRenderProps(props.children, children => (<>
        {children}
        <SelectionIndicator className="absolute bottom-0 left-0 h-[3px] w-full rounded-[3px] bg-orange-600 transition-all" />
      </>))}
    </RACTab>
  );
}

export function TabPanels<T extends object>(props: TabPanelsProps<T>) {
  return <RACTabPanels {...props} className={`relative h-auto w-full overflow-clip ${props.className ?? ''}`} />;
}

export function TabPanel(props: TabPanelProps) {
  return <RACTabPanel {...props} className={`box-border rounded-lg p-3 outline-none transition-opacity data-[focus-visible]:outline-2 data-[focus-visible]:outline-orange-500 ${props.className ?? ''}`} />;
}
