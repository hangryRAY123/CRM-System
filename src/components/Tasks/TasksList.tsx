import React from 'react';
import { List } from './script';
import { Task } from './Task';

export const TasksList: React.FC<{
  tasks: { id: number; title: string; created: 'string'; isDone: boolean }[];
  handleChangeTask: Function;
}> = (props) => {
  return (
    <List>
      {props.tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          isDone={task.isDone}
          handleChangeTask={props.handleChangeTask}
          title={task.title}
        >
          {task.title}
        </Task>
      ))}
    </List>
  );
};
