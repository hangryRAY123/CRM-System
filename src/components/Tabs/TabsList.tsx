import React from 'react';
import { useState } from 'react';
import { Tabs } from 'antd';
import { TabKeys } from '../../helpers/types';

export const TabsList: React.FC<{
  changeTab: (tab: TabKeys) => void;
  info: object;
}> = (props) => {
  const [currentTab, setCurrentTab] = useState<TabKeys>(TabKeys.all);

  type transletedTabsType = {
    all: string;
    completed: string;
    inWork: string;
    [key: string]: string;
  };

  const transletedTabs: transletedTabsType = {
    all: 'Все',
    completed: 'Завершенные',
    inWork: 'Активные',
  };

  const handleChangeTab = (key: string) => {
    setCurrentTab(key as TabKeys);
    props.changeTab(key as TabKeys);
  };
  return (
    <Tabs
      activeKey={currentTab}
      centered
      onChange={handleChangeTab}
      items={Object.entries(props.info).map(([key, value]) => {
        return {
          label: `${transletedTabs[key]}(${value})`,
          key: key,
        };
      })}
    />
  );
};
