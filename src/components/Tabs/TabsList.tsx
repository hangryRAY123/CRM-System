import React from 'react';
import { useState } from 'react';
import { Tabs } from 'antd';

export const TabsList: React.FC<{
  handleTabChange: (tab: string) => void;
  info: object;
}> = (props) => {
  const [currentTab, setCurrentTab] = useState('all');

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

  const onChange = (key: string) => {
    setCurrentTab(key);
    props.handleTabChange(key);
    // console.log(key);
  };

  return (
    <Tabs
      activeKey={currentTab}
      // animated={false}
      centered
      onChange={onChange}
      items={Object.entries(props.info).map(([key, value]) => {
        return {
          label: `${transletedTabs[key]}(${value})`,
          key: key,
        };
      })}
    />
  );
};
