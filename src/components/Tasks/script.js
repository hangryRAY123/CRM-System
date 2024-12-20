import styled from 'styled-components';

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;
`;

export const TaskItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  label {
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
  }

  .btn-container {
    display: flex;
    gap: 10px;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0;
    background-color: none;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    position: relative;
    bottom: 0;
    left: 0;
    transition: 0.2s ease;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  button:first-child {
    background-color: #5393ff;
  }

  button:last-child {
    background-color: #ff665c;
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
