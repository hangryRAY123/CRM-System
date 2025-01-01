import { List } from './script';
import { Task } from './Task';

export const TasksList = ({
  tasks,
  handleChangeTask
}) => {
  return (
    <List>
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          isDone={task.isDone}
          handleChangeTask={handleChangeTask}
          title={task.title}
        >
          {task.title}
        </Task>
      ))}
    </List>
  );
};
