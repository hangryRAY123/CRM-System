import './App.css';
import { useState, useEffect } from 'react';
import { AddTask } from './components/AddTask/AddTask';
import { TabsList } from './components/Tabs/TabsList';
import { TasksList } from './components/Tasks/TasksList';
import { fetchTasks } from './https';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [allTask, setAllTask] = useState([]);
  const [info, setInfo] = useState({});
  const [currentTab, setCurrentTab] = useState('all');

  useEffect(() => {
    const fetchTasksList = async () => {
      setIsLoading(true);

      try {
        const tasks = await fetchTasks();
        setAllTask(tasks.data);
        setInfo(tasks.info);
      } catch (e) {
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
    } catch (e) {
      setError(e.message || 'Failed to change task. Please try again later.');
      return;
    }
  };

  const handleTabChange = async (tab) => {
    try {
      const tasks = await fetchTasks(tab);

      setAllTask(tasks.data);
      setInfo(tasks.info);
      setCurrentTab(tab);
    } catch (e) {
      setError(error.message || 'Failed change task.');
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <AddTask handleAddTask={handleChangeTask} />
          <TabsList info={info} handleTabChange={handleTabChange} currentTab={currentTab} />
          <TasksList tasks={allTask} handleChangeTask={handleChangeTask} />
        </>
      )}
    </>
  );
}

export default App;
