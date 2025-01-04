import React from 'react';
import { Tabs } from 'antd';

export const TabsList: React.FC<{
  handleTabChange: (tab: string) => void;
  currentTab: string;
  info: object;
}> = (props) => {
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
    props.handleTabChange(key);
  };

  return (
    <Tabs
      activeKey={props.currentTab}
      animated={false}
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
