import { NavLink, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { UserOutlined, BarsOutlined, UsergroupAddOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '/profile', icon: <UserOutlined />, label: <NavLink to='/profile'>Профиль</NavLink> },
  {
    key: '/users',
    icon: <UsergroupAddOutlined />,
    label: <NavLink to='/users'>Пользватели</NavLink>,
  },
  {
    key: '/todolist',
    icon: <BarsOutlined />,
    label: <NavLink to='/todolist'>Список задач</NavLink>,
  },
];

export const Nav: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      <Menu
        defaultSelectedKeys={[`${location.pathname}`]}
        mode='inline'
        theme='dark'
        items={items}
      />
    </div>
  );
};
