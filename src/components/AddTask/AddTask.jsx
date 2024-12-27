import { AddTaskBlock } from './style';
import { addingTask } from '../../https';
import { useState } from 'react';

export const AddTask = ({ handleAddTask }) => {
  const [error, setError] = useState('');

  const handleAddTaskLocal = async (form) => {
    form.preventDefault();
    const newTask = form.target[0].value;

    if (newTask.length >= 2 && newTask.length <= 64) {
      try {
        await addingTask(newTask);
        await handleAddTask(newTask);
        form.target.reset();
      } catch (e) {
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
          type='text'
          name='task'
          placeholder='Task To Be Done... '
          minLength='2'
          maxLength='64'
          required
        />

        <button type='submit'>Add</button>
      </form>
    </AddTaskBlock>
  );
};
