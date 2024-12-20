import { TaskItem } from './script';
import { useState } from 'react';
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
    setChecked(!checked);
  };

  const handleEdit = (status) => {
    setEdit(status);
  };
  const handleNoEdit = () => {
    changeTask[id] = children;
  };
  console.log(checked);

  return (
    <TaskItem $save={saveIcn}>
      <div className='change-task'>
        <input className='visually-hidden' id={id} type='checkbox' required />
        <span className={`control ${checked ? 'checked' : ''}`} onClick={handleChecked}></span>
        {!edit ? (
          <label htmlFor={id} className={checked && 'completed'} onClick={handleChecked}>
            {children}
          </label>
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
