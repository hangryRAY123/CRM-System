import { TabsList } from '../Tabs/TabsList';
import { TasksList } from './TasksList';

export const Tasks = ({
  tasks,
  deleteTask,
  info,
  handleTabChange,
  currentTab,
  handleChangeTask,
  changeTask,
  handleUpdateTask,
}) => {
  return (
    <section>
      {info && <TabsList info={info} handleTabChange={handleTabChange} currentTab={currentTab} />}
      {tasks && (
        <TasksList
          tasks={tasks}
          deleteTask={deleteTask}
          handleChangeTask={handleChangeTask}
          changeTask={changeTask}
          handleUpdateTask={handleUpdateTask}
        />
      )}
    </section>
  );
};
