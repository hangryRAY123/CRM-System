import { Nav } from '../components/Nav/Nav';
import { MainHeader } from '../components/MainHeader/MainHeader';
import { WechatOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Content, Sider } = Layout;

export const MainLayout = () => {
  const isCollapsed = useSelector((state: any) => state.auth.isCollapsed);
  const isAuth = useSelector((state: any) => state.auth.isAuth);

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
