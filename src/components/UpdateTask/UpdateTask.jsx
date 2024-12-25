import saveIcn from '../../assets/save.svg';

export const UpdateTask = ({
  task,
  handleChangeTask,
  handleUpdateTask,
  isDone,
  id,
  handleEdit,
}) => {
  const updateTask = (form) => {
    form.preventDefault();

    const newTask = form.target[0].value;

    handleUpdateTask(isDone, id, newTask);

    if (newTask.length >= 2 && newTask.length <= 64) {
      handleEdit(false);
    }
  };
  return (
    <form onSubmit={updateTask}>
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
  );
};
