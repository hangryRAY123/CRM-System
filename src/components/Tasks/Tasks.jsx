import { TabsList } from '../Tabs/TabsList';
import { TasksList } from './TasksList';

export const Tasks = ({ tasks }) => {
  return (
    <section>
      <TabsList />
      <TasksList tasks={tasks} />
    </section>
  );
};
