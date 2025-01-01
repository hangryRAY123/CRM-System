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
  gap: 10px;

  .change-task {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;

    form {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      width: 100%;
    }

    p {
      margin: 0;
    }

    .checked.control {
      background-color: #5393ff;
      border-color: #5393ff;
    }

    .checked.control::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      background-image: url('data:image/svg+xml,<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 30px; height: 30px;"><path d="M13 5L7.00004 11L4.5 8.50002" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 15px 15px;
    }

    input[type='text'] {
      width: 100%;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
      outline: none;
    }
  }

  .btn-container {
    display: flex;
    gap: 10px;
  }

  .btn {
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
    background-color: #5393ff;

    svg {
      width: 20px;
      height: 20px;
    }

    img {
      width: 20px;
      height: 20px;
    }
  }

  .btn--delete {
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

  .control {
    position: relative;
    width: 20px;
    height: 20px;
    border: 1px solid #ccc;
    border-radius: 50%;
    flex-shrink: 0;
    cursor: pointer;
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

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    clip: rect(0 0 0 0);
    overflow: hidden;
  }
`;
