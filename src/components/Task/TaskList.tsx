import React from 'react';
import { List } from './style';
import { Task } from './Task';
import { AllTask } from '../../helpers/types';

export const TaskList: React.FC<{
  tasks: AllTask[];
  changeTask: () => void;
}> = (props) => {
  return (
    <List>
      {props.tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          isDone={task.isDone}
          changeTask={props.changeTask}
          title={task.title}
        >
          {task.title}
        </Task>
      ))}
    </List>
  );
};
