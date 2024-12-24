import { TaskItem } from './script';
import { useState, useEffect } from 'react';
import closeIcn from '../../assets/close.svg';
import deleteIcn from '../../assets/delete.svg';
import editIcn from '../../assets/edit.svg';
import saveIcn from '../../assets/save.svg';

export const Task = ({
  children,
  id,
  isDone,
  deleteTask,
  handleChangeTask,
  changeTask,
  handleUpdateTask,
}) => {
  const [edit, setEdit] = useState(false);
  const [checked, setChecked] = useState(isDone);

  const handleChecked = () => {
    setChecked((editing) => !editing);
  };

  const handleEdit = (status) => {
    setEdit(status);
  };
  const handleNoEdit = () => {
    changeTask[id] = children;
  };

  useEffect(() => {
    handleUpdateTask(checked, id, changeTask[id]);
  }, [checked]);

  return (
    <TaskItem>
      <div className='change-task'>
        <span
          className={`control ${checked ? 'checked' : ''}`}
          onClick={() => {
            handleChecked();
          }}
        ></span>
        {!edit ? (
          <p htmlFor={id} className={checked ? 'completed' : ''}>
            {children}
          </p>
        ) : (
          <input
            type='text'
            value={changeTask[id]}
            onChange={(event) => handleChangeTask(id, event.target.value)}
          />
        )}
      </div>
      <div className='btn-container'>
        {edit ? (
          <>
            <button
              type='button'
              onClick={() => {
                handleUpdateTask(isDone, id, changeTask[id]);
                if (changeTask[id].length >= 2 && changeTask[id].length <= 64) {
                  handleEdit(false);
                }
              }}
            >
              <img style={{ width: '30px', height: '30px' }} src={saveIcn} alt='Save.' />
            </button>
            <button
              type='button'
              onClick={() => {
                handleEdit(false);
                handleNoEdit();
              }}
            >
              <img src={closeIcn} alt='Close.' />
            </button>
          </>
        ) : (
          <button
            type='button'
            onClick={() => {
              handleEdit(true);
            }}
          >
            <img src={editIcn} alt='Edit.' />
          </button>
        )}

        <button type='button' onClick={() => deleteTask(id)}>
          <img src={deleteIcn} alt='Delete.' />
        </button>
      </div>
    </TaskItem>
  );
};
