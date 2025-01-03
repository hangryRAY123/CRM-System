// import { NavLink } from 'react-router-dom';
// import { NavList } from './style';

// export const Nav = () => {
//   return (
//     <NavList>
//       <ul>
//         <li>
//           <NavLink to='/profile'>Профиль</NavLink>
//         </li>
//         <li>
//           <NavLink to='/'>Список задач</NavLink>
//         </li>
//       </ul>
//     </NavList>
//   );
// };

import { NavLink } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { UserOutlined, BarsOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '/profile', icon: <UserOutlined />, label: <NavLink to='/profile'>Профиль</NavLink> },
  { key: '/', icon: <BarsOutlined />, label: <NavLink to='/'>Список задач</NavLink> },
];

export const Nav: React.FC = () => {
  return (
    <div>
      <Menu defaultSelectedKeys={['/']} mode='inline' theme='dark' items={items} />
    </div>
  );
};
