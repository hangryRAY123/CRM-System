import { List } from './script';
import { Task } from './Task';

export const TasksList = ({ tasks, deleteTask }) => {
  return (
    <List>
      {tasks.map((task) => (
        <Task key={task.id} id={task.id} deleteTask={deleteTask}>
          {task.title}
        </Task>
      ))}
    </List>
  );
};
