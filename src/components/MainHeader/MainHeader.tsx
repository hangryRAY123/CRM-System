import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../../store/auth/auth-slice';
import { logOut } from '../../api/auth';
import TokenManager from '../../helpers/token-manager';
import { useNavigate } from 'react-router-dom';
import { State } from '../../helpers/types';
const { Header } = Layout;

export const MainHeader = () => {
  const isCollapsed = useSelector((state: State) => state.auth.isCollapsed);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await logOut();
      TokenManager.clearToken();
      dispatch(authAction.setIsAuth(false));
      navigate('/auth/login');
    } catch {
      throw new Error('Failed to log out. Please try again later.');
    }
  };

  const handleMenuClick = () => {
    dispatch(authAction.toggle());
  };

  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 16px 0 0',
        backgroundColor: '#f1f4f9',
      }}
    >
      <Button
        type='text'
        icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={handleMenuClick}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      <Button
        type='primary'
        icon={<LogoutOutlined />}
        onClick={handleLogOut}
        style={{
          fontSize: '16px',
        }}
      >
        Logout
      </Button>
    </Header>
  );
};
