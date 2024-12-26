import { List } from './script';
import { Task } from './Task';

export const TasksList = ({
  tasks,
  handleDeleteTask,
  handleUpdateTask,
}) => {
  return (
    <List>
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          isDone={task.isDone}
          handleDeleteTask={handleDeleteTask}
          handleUpdateTask={handleUpdateTask}
        >
          {task.title}
        </Task>
      ))}
    </List>
  );
};
