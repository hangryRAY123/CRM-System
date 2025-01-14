import './App.css';
import { useState } from 'react';
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
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const [isCollapsed, setCollapsed] = useState<boolean>(false);
  const isAuth = useSelector((state: any) => state.auth.isAuth);
  const userRegistered = useSelector((state: any) => state.reg.login);

  return (
    <BrowserRouter>
      {!isAuth && (
        <section className='auth'>
          <div className='lock'>{userRegistered ? <UnlockOutlined /> : <LockOutlined />}</div>
          <Routes>
            <Route path='/' element={<Authorization />} />
            <Route path='/reg' element={<Registration />} />
          </Routes>
        </section>
      )}
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
            <Header style={{ padding: 0, background: '#f1f4f9', textAlign: 'left' }}>
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
