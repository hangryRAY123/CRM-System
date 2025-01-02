import React from 'react';
import { List } from './style';
import { Tab } from './Tab';

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

  return (
    <List>
      {Object.entries(props.info).map(([key, value]) => (
        <Tab
          id={key}
          key={key}
          currentTab={props.currentTab}
          handleTabChange={props.handleTabChange}
        >
          {transletedTabs[key]}({value})
        </Tab>
      ))}
    </List>
  );
};
