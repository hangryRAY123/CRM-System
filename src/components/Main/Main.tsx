import { Nav } from '../Nav/Nav';
import { TodoList } from '../../pages/TodoList';
import { Profile } from '../../pages/Profile';
import { MainFooter } from '../MainFooter/MainFooter';
import { MainHeader } from '../MainHeader/MainHeader';
import { WechatOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { updateRefrashToken } from '../../store/authorization/auth-action';

const { Content, Sider } = Layout;

export const Main = () => {
  const isCollapsed = useSelector((state: any) => state.auth.isCollapsed);
  const isAuth = useSelector((state: any) => state.auth.isAuth);
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const token = localStorage.getItem('refreshToken');

  useEffect(() => {
    if (token) {
      dispatch(updateRefrashToken(token));
    }

    const timeout = setTimeout(() => {
      if (!isAuth) {
        navigate('/');
      }
    }, 500);
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
