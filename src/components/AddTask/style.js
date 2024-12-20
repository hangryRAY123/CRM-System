import styled from 'styled-components';

export const AddTaskBlock = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  gap: 20px;

  input {
    width: 100%;
    padding: 12px 0;
    border: none;
    outline: none;
    border-bottom: 1px solid #dcdfe6;
    color: #000;
    background-color: #f1f4f9;
  }

  input::placeholder {
    color: #8d9095;
  }

  button {
    padding: 10px 33px;
    background-color: #5492ff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    position: relative;
    bottom: 0;
    left: 0;
    transition: 0.2s ease;
  }

  button:hover {
    bottom: 2px;
    left: 2px;
    -webkit-box-shadow: -7px 7px 5px 0 rgba(0, 0, 0, 0.75);
    box-shadow: -7px 7px 5px 0 rgba(0, 0, 0, 0.75);
  }

  button:active {
    bottom: 0;
    left: 0;
    box-shadow: none;
  }
`;
