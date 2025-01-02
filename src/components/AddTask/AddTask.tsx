import { AddTaskBlock } from './style';
import { addingTask } from '../../https';
import { useState } from 'react';
import React from 'react';

export const AddTask: React.FC<{
  handleAddTask: (newTask: string) => void;
}> = (props) => {
  const [error, setError] = useState('');

  const handleAddTaskLocal = async (event: React.FormEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      userTaskInput: { value: string };
    };
    const newTask = target.userTaskInput.value;

    if (newTask.length >= 2 && newTask.length <= 64) {
      try {
        await addingTask(newTask);
        await props.handleAddTask(newTask);
        target.userTaskInput.value = '';
      } catch (e: any) {
        setError(e.message || 'Failed to add task. Please try again later.');
        return;
      }

      setError('');
    } else {
      setError('Task title should be between 2 and 64 characters long.');
    }
  };

  return (
    <AddTaskBlock>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleAddTaskLocal}>
        <input
          id='userTaskInput'
          type='text'
          name='task'
          placeholder='Task To Be Done... '
          minLength={2}
          maxLength={64}
          required
        />

        <button type='submit'>Add</button>
      </form>
    </AddTaskBlock>
  );
};
