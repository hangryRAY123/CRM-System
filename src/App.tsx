import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav/Nav';
import { TodoList } from './components/Pages/TodoList';
import { Profile } from './components/Pages/Profile';
import { Button, Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, WechatOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout
      style={{
        minHeight: '100vh',
        height: '100%',
      }}
    >
      <BrowserRouter>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className='demo-logo-vertical'>
            <WechatOutlined />
          </div>
          <Nav />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: '#f1f4f9', textAlign: 'left' }}>
            <Button
              type='text'
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <Routes>
              <Route path='/' element={<TodoList />} />
              <Route path='/profile' element={<Profile />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
