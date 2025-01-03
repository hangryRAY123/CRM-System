import { TaskItem } from './script';
import saveIcn from '../../assets/save.svg';
import { deleteTask, updateTask } from '../../https';
import { useState } from 'react';
import closeIcn from '../../assets/close.svg';
import deleteIcn from '../../assets/delete.svg';
import editIcn from '../../assets/edit.svg';

export const Task = ({ children, id, isDone, handleChangeTask, title }) => {
  const [edit, setEdit] = useState(false);
  const [checked, setChecked] = useState(isDone);
  const [task, setTask] = useState(title);
  const [error, setError] = useState('');

  const handleCansel = () => {
    handleEdit(false);
    setTask(title);
  };

  const handleChangeTaskLocal = (event) => {
    setTask(event.target.value);
  };

  const handleEdit = (status) => {
    setEdit(status);
  };

  const updateTaskLocal = async (form) => {
    form.preventDefault();
    const newTask = form.target[0].value;

    if (newTask.length >= 2 && newTask.length <= 64) {
      try {
        await updateTask(isDone, id, newTask);
        await handleChangeTask();
        await handleEdit(false);
      } catch (e) {
        setError(e.message || 'Failed update task.');
        return;
      }

      setError('');
    } else {
      setError('Task title should be between 2 and 64 characters long.');
    }
  };

  const handleDeleteTaskLocal = async () => {
    try {
      await deleteTask(id);
      await handleChangeTask();
    } catch (error) {
      setError(error.message || 'Failed to fetch tasks.');
    }
  };

  const handleChecked = async () => {
    setChecked((prev) => !prev);
    if (task.length >= 2 && task.length <= 64) {
      try {
        await updateTask(!checked, id, task);
        await handleChangeTask(task);
      } catch (error) {
        setError(error.message || 'Failed to fetch tasks.');
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
      <TaskItem>
        <div className='change-task'>
          <div style={{ display: 'flex' }}>
            <input
              className='visually-hidden'
              type='checkbox'
              checked={checked}
              onChange={handleChecked}
            />
            <span className={`control ${checked ? 'checked' : ''}`} onClick={handleChecked}></span>
          </div>
          {!edit ? (
            <p className={checked ? 'completed' : ''}>{children}</p>
          ) : (
            <form onSubmit={updateTaskLocal}>
              <input
                type='text'
                value={task}
                onChange={handleChangeTaskLocal}
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
          )}
        </div>

        <div className='btn-container'>
          {!edit ? (
            <button
              className='btn'
              type='button'
              onClick={() => {
                handleEdit(true);
              }}
            >
              <img src={editIcn} alt='Edit.' />
            </button>
          ) : (
            <button className='btn' type='button' onClick={handleCansel}>
              <img src={closeIcn} alt='Close.' />
            </button>
          )}

          <button className='btn btn--delete' type='button' onClick={handleDeleteTaskLocal}>
            <img src={deleteIcn} alt='Delete.' />
          </button>
        </div>
      </TaskItem>
    </>
  );
};
