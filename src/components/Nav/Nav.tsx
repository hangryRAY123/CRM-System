import { NavLink, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined, BarsOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { State } from '../../helpers/types';

type MenuItem = {
  key: string;
  icon: React.ReactNode;
  label: React.ReactNode;
};

export const Nav: React.FC = () => {
  const location = useLocation();
  const isAdmin = useSelector((state: State) => state.auth.isAdmin);

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

  const filteredItems = items.filter((item: MenuItem) => isAdmin || item.key !== '/users');

  return (
    <div className='nav'>
      <Menu
        defaultSelectedKeys={[`${location.pathname}`]}
        mode='inline'
        theme='dark'
        items={filteredItems}
      />
    </div>
  );
};
