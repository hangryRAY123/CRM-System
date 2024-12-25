import { AddTaskBlock } from './style';

export const AddTask = ({ task, handleAddTask, handleToggleDone }) => {
  return (
    <AddTaskBlock>
      <input
        type='text'
        value={task}
        onChange={handleAddTask}
        placeholder='Task To Be Done... '
        required
      />

      <button type='button' onClick={handleToggleDone}>
        Add
      </button>
    </AddTaskBlock>
  );
};
