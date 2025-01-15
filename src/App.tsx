import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav/Nav';
import { TodoList } from './pages/TodoList';
import { Profile } from './pages/Profile';
import { Authorization } from './pages/Authorization';
import { Registration } from './pages/Registrtion';
import { Button, Layout } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  WechatOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { authAction } from './store/authorization/auth-slice';
import { logOut } from './api/https';

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const [isCollapsed, setCollapsed] = useState<boolean>(false);
  const isAuth = useSelector((state: any) => state.auth.isAuth);
  const dispatch: any = useDispatch();

  const logOutUser = () => {
    logOut();
    // localStorage.setItem('refreshToken', '');
  };

  useEffect(() => {
    const token = localStorage.getItem('refreshToken');
    if (token) {
      dispatch(authAction.setIsAuth(true));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Authorization />} />
        <Route path='/reg' element={<Registration />} />
      </Routes>

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
                onClick={() => setCollapsed(!isCollapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
              <Button
                type='primary'
                icon={<LogoutOutlined />}
                onClick={logOutUser}
                style={{
                  fontSize: '16px',
                }}
              >
                Logout
              </Button>
            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
              <Routes>
                <Route path='/todolist' element={<TodoList />} />
                <Route path='/profile' element={<Profile />} />
              </Routes>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      )}
    </BrowserRouter>
  );
}

export default App;
