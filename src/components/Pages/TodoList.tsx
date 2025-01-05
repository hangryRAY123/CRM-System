import { useState, useEffect } from 'react';
import { AddTask } from '../AddTask/AddTask';
import { TabsList } from '../Tabs/TabsList';
import { TasksList } from '../Tasks/TasksList';
import { fetchTasks } from '../../https';

export const TodoList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [allTask, setAllTask] = useState([]);
  const [info, setInfo] = useState({});
  const [currentTab, setCurrentTab] = useState('all');

  useEffect(() => {
    const fetchTasksList = async () => {
      setIsLoading(true);

      try {
        const tasks = await fetchTasks(currentTab);
        setAllTask(tasks.data);
        setInfo(tasks.info);
      } catch (e: any) {
        setError(e.message || 'Failed to fetch tasks.');
      }

      setIsLoading(false);
    };
    fetchTasksList();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleChangeTask();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [currentTab]);

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
    } catch (error: any) {
      setError(error.message || 'Failed change task.');
    }
  };

  return (
    <section>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <AddTask handleAddTask={handleChangeTask} />
          <TabsList info={info} handleTabChange={handleTabChange} />
          <TasksList tasks={allTask} handleChangeTask={handleChangeTask} />
        </>
      )}
    </section>
  );
};
