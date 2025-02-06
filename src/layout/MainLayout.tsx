import { Nav } from '../components/Nav/Nav';
import { MainHeader } from '../components/MainHeader/MainHeader';
import { WechatOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { updateRefrashToken } from '../store/auth/auth-action';

const { Content, Sider } = Layout;

export const MainLayout = () => {
  const isCollapsed = useSelector((state: any) => state.auth.isCollapsed);
  const isAuth = useSelector((state: any) => state.auth.isAuth);
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const token = localStorage.getItem('refreshToken');

  useEffect(() => {
    if (!isAuth && token) {
      dispatch(updateRefrashToken(token));
    }

    const timeout = setTimeout(() => {
      if (!isAuth) {
        navigate('/');
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isAuth, dispatch]);

  return (
    <>
      {isAuth && (
        <Layout
          style={{
            minHeight: '100vh',
            height: '100%',
          }}
        >
          <Sider trigger={null} collapsible collapsed={isCollapsed}>
            <div className='demo-logo-vertical'>
              <WechatOutlined />
            </div>
            <Nav />
          </Sider>
          <Layout>
            <MainHeader />
            <Content style={{ margin: '24px 16px 0' }}>
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      )}
    </>
  );
};
