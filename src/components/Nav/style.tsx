import styled from 'styled-components';

export const NavList = styled.nav`
  ul {
    list-style-type: none;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: start;
    height: 100%;
    width: 200px;
    gap: 15px;
    padding: 20px;
    background: #213547;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    color: #fff;
    box-sizing: border-box;

    a {
      color: #fff;
      text-decoration: none;
      transition: color 0.3s ease;
    }
    a[aria-current='page'] {
      color: #5492ff;
      font-weight: bold;
    }

    a:hover {
      color: #5492ff;
    }
  }
`;
