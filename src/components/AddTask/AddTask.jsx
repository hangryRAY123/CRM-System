import { AddTaskBlock } from './style';

export const AddTask = ({ handleAddTask }) => {
  return (
    <AddTaskBlock>
      <form onSubmit={handleAddTask}>
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
