import styled from 'styled-components';

export const AddTaskBlock = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  gap: 20px;

  input {
    width: 100%;
    padding: 10px 0;
    border: none;
    outline: none;
    border-bottom: 1px solid #dcdfe6;
    color: #000;
  }

  input::placeholder {
    color: #8d9095;
  }

  button {
    padding: 10px 30px;
    background-color: #5492ff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
  }
`;
