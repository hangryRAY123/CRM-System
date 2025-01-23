import { NavLink, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { UserOutlined, BarsOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

type MenuItem = Required<MenuProps>['items'][number];

export const Nav: React.FC = () => {
  const location = useLocation();
  const isAdmin = useSelector((state: any) => state.profile.isAdmin);

  const items: MenuItem[] = [
    { key: '/profile', icon: <UserOutlined />, label: <NavLink to='/profile'>Профиль</NavLink> },
    {
      key: '/users',
      icon: <UsergroupAddOutlined />,
      label: <NavLink to='/users'>Пользватели</NavLink>,
      disabled: !isAdmin,
    },
    {
      key: '/todolist',
      icon: <BarsOutlined />,
      label: <NavLink to='/todolist'>Список задач</NavLink>,
    },
  ];

  return (
    <div className='nav'>
      <Menu
        defaultSelectedKeys={[`${location.pathname}`]}
        mode='inline'
        theme='dark'
        items={items}
      />
    </div>
  );
};
