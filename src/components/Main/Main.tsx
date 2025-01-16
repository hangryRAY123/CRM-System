import { Nav } from '../Nav/Nav';
import { TodoList } from '../../pages/TodoList';
import { Profile } from '../../pages/Profile';
import { MainFooter } from '../MainFooter/MainFooter';
import { MainHeader } from '../MainHeader/MainHeader';
import { WechatOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const { Content, Sider } = Layout;

export const Main = () => {
  const isCollapsed = useSelector((state: any) => state.auth.isCollapsed);
  const isAuth = useSelector((state: any) => state.auth.isAuth);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isAuth) {
        navigate('/');
      }
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isAuth]);

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
              <Routes>
                <Route path='/todolist' element={<TodoList />} />
                <Route path='/profile' element={<Profile />} />
              </Routes>
            </Content>
            <MainFooter />
          </Layout>
        </Layout>
      )}
    </>
  );
};
