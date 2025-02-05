import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../../store/store-action';
import { storeAction } from '../../store/store-slice';
const { Header } = Layout;

export const MainHeader = () => {
  const isCollapsed = useSelector((state: any) => state.store.isCollapsed);
  const dispatch: any = useDispatch();

  const handleLogOut = () => {
    dispatch(logOutUser());
  };

  const handleMenuClick = () => {
    dispatch(storeAction.toggle());
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
