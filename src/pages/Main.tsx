import { Nav } from '../components/Nav/Nav';
import { TodoList } from './TodoList';
import { Profile } from './Profile';
import { UserProfile } from './UserProfile';
import { Users } from './Users';
import { MainFooter } from '../components/MainFooter/MainFooter';
import { MainHeader } from '../components/MainHeader/MainHeader';
import { WechatOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { updateRefrashToken } from '../store/authorization/auth-action';

const { Content, Sider } = Layout;

export const Main = () => {
  const isCollapsed = useSelector((state: any) => state.auth.isCollapsed);
  const isAuth = useSelector((state: any) => state.auth.isAuth);
  const isAdmin = useSelector((state: any) => state.profile.isAdmin);
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
              <Routes>
                <Route path='/profile' element={<Profile />} />
                <Route path='/profile/:id' element={<UserProfile />} />
                {isAdmin && <Route path='/users' element={<Users />} />}
                <Route path='/todolist' element={<TodoList />} />
              </Routes>
            </Content>
            <MainFooter />
          </Layout>
        </Layout>
      )}
    </>
  );
};
