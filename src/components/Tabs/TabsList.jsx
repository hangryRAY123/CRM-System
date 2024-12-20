import { List } from './style';
import { Tab } from './Tab';

export const TabsList = ({ info, handleTabChange, currentTab }) => {
  return (
    <List>
      {Object.entries(info).map(([key, value]) => (
        <Tab id={key} key={key} currentTab={currentTab} handleTabChange={handleTabChange}>
          {key}({value})
        </Tab>
      ))}
    </List>
  );
};
