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
  justify-content: space-between;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  gap: 10px;

  .change-task {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;

    p {
      margin: 0;
    }
  }

  .btn-container {
    display: flex;
    gap: 10px;
  }

  .completed {
    position: relative;
  }

  .completed::before {
    content: '';
    position: absolute;
    top: 55%;
    left: 0;
    transform: translateY(-50%);
    height: 2px;
    width: 100%;
    background-color: #213547;
  }
`;
