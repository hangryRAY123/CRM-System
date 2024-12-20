import { List } from './script';
import { Task } from './Task';

export const TasksList = ({
  tasks,
  deleteTask,
  handleChangeTask,
  changeTask,
  handleUpdateTask,
}) => {
  return (
    <List>
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          isDone={task.isDone}
          deleteTask={deleteTask}
          handleChangeTask={handleChangeTask}
          changeTask={changeTask}
          handleUpdateTask={handleUpdateTask}
        >
          {task.title}
        </Task>
      ))}
    </List>
  );
};
