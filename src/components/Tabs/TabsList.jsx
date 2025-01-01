import { List } from './style';
import { Tab } from './Tab';

export const TabsList = ({ info, handleTabChange, currentTab }) => {
  const transletedTabs = {
    all: 'Все',
    completed: 'Завершенные',
    inWork: 'Активные',
  };

  return (
    <List>
      {Object.entries(info).map(([key, value]) => (
        <Tab id={key} key={key} currentTab={currentTab} handleTabChange={handleTabChange}>
          {transletedTabs[key]}({value})
        </Tab>
      ))}
    </List>
  );
};
