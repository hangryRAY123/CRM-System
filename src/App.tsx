import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav/Nav';
import { AddTask } from './components/AddTask/AddTask';
import { TabsList } from './components/Tabs/TabsList';
import { TasksList } from './components/Tasks/TasksList';
import { fetchTasks } from './https';
import { Button, Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, WechatOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [allTask, setAllTask] = useState([]);
  const [info, setInfo] = useState({});
  const [currentTab, setCurrentTab] = useState('all');
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const fetchTasksList = async () => {
      setIsLoading(true);

      try {
        const tasks = await fetchTasks();
        setAllTask(tasks.data);
        setInfo(tasks.info);
      } catch (e: any) {
        setError(e.message || 'Failed to fetch tasks.');
      }

      setIsLoading(false);
    };
    fetchTasksList();
  }, []);

  const handleChangeTask = async () => {
    try {
      const tasks = await fetchTasks(currentTab);

      setAllTask(tasks.data);
      setInfo(tasks.info);
    } catch (e: any) {
      setError(e.message || 'Failed to change task. Please try again later.');
      return;
    }
  };

  const handleTabChange = async (tab: string) => {
    try {
      const tasks = await fetchTasks(tab);

      setAllTask(tasks.data);
      setInfo(tasks.info);
      setCurrentTab(tab);
    } catch (e: any) {
      setError(e.message || 'Failed change task.');
    }
  };

  const TodoList = () => {
    return (
      <section>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <AddTask handleAddTask={handleChangeTask} />
        <TabsList info={info} handleTabChange={handleTabChange} currentTab={currentTab} />
        <TasksList tasks={allTask} handleChangeTask={handleChangeTask} />
      </section>
    );
  };

  const Profile = () => {
    return (
      <section>
        <h1>Profile Page</h1>
      </section>
    );
  };

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
              <Route path='/' element={isLoading ? <div>Loading...</div> : <TodoList />} />
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
