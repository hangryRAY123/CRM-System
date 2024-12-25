import styled from 'styled-components';

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 0;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 20px;

  li {
    color: #000;
    font-size: 18px;
    flex-grow: 1;
    width: 100%;
    border-bottom: 2px solid #ccc;
    transition: 0.3s ease;
  }

  li.active {
    border-bottom: 2px solid #5492ff;
    pointer-events: none;

    button {
      color: #5492ff;
    }
  }

  button {
    padding: 5px 10px;
    border: none;
    outline: none;
    border-radius: 5px;
    background-color: transparent;
    color: #8d9095;
    cursor: pointer;
    text-transform: uppercase;
    width: 100%;
    transition: 0.3s ease;
  }

  li:hover {
    border-bottom: 2px solid #5492ff;

    button {
      color: #5492ff;
    }
  }
`;
