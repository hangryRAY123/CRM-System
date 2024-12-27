import { TaskItem } from './script';
import { UpdateTask } from '../UpdateTask/UpdateTask';
import { deleteTask, updateTask } from '../../https';
import { useState, useEffect } from 'react';
import closeIcn from '../../assets/close.svg';
import deleteIcn from '../../assets/delete.svg';
import editIcn from '../../assets/edit.svg';

export const Task = ({ children, id, isDone, handleChangeTask, title }) => {
  const [edit, setEdit] = useState(false);
  const [checked, setChecked] = useState(isDone);
  const [task, setTask] = useState(title);
  const [error, setError] = useState('');

  const handleDeleteTaskLocal = async () => {
    try {
      await deleteTask(id);
      await handleChangeTask();
    } catch (error) {
      setError(error.message || 'Failed to fetch tasks.');
    }
  };

  const handleCansel = () => {
    handleEdit(false);
    setTask(title);
  };

  const handleChangeTaskLocal = (event) => {
    setTask(event.target.value);
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

  const handleEdit = (status) => {
    setEdit(status);
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
            <UpdateTask
              task={task}
              handleChangeTaskLocal={handleChangeTaskLocal}
              handleChangeTask={handleChangeTask}
              isDone={isDone}
              id={id}
              handleEdit={handleEdit}
            />
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
