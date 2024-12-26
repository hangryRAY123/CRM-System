import saveIcn from '../../assets/save.svg';
import { updateTask } from '../../https';
import { useState } from 'react';

export const UpdateTask = ({
  task,
  handleChangeTask,
  handleUpdateTask,
  isDone,
  id,
  handleEdit,
}) => {
  const [error, setError] = useState('');

  const updateTaskLocal = async (form) => {
    form.preventDefault();
    const newTask = form.target[0].value;

    if (newTask.length >= 2 && newTask.length <= 64) {
      try {
        await updateTask(isDone, id, newTask);
        handleUpdateTask();
        handleEdit(false);
      } catch (e) {
        setError(e.message || 'Failed update task.');
        return;
      }

      setError('');
    } else {
      setError('Task title should be between 2 and 64 characters long.');
    }
  };
  return (
    <>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={updateTaskLocal}>
        <input
          type='text'
          value={task}
          onChange={handleChangeTask}
          minLength='2'
          maxLength='64'
          required
        />
        <div className='btn-container'>
          <button className='btn' type='submit'>
            <img style={{ width: '30px', height: '30px' }} src={saveIcn} alt='Save.' />
          </button>
        </div>
      </form>
    </>
  );
};
