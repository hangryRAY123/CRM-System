import { useState, useEffect } from 'react';
import { AddTask } from '../components/AddTask/AddTask';
import { TabList } from '../components/Tab/TabList';
import { TaskList } from '../components/Task/TaskList';
import { fetchTasks } from '../api/todo';
import { TabKeys, AllTask, TasksInfo } from '../helpers/types';
import { LoadingOutlined } from '@ant-design/icons';
import { Divider, Alert } from 'antd';

export const TodoList = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [allTask, setAllTask] = useState<AllTask[]>([]);
  const [info, setInfo] = useState<TasksInfo>({ all: 0, completed: 0, inWork: 0 });
  const [currentTab, setCurrentTab] = useState<TabKeys>(TabKeys.all);

  useEffect(() => {
    const fetchTasksList = async () => {
      setLoading(true);

      try {
        const tasks = await fetchTasks(currentTab);
        setAllTask(tasks.data);
        setInfo(tasks.info);
      } catch (e: any) {
        setError(e.message || 'Failed to fetch tasks.');
      }

      setLoading(false);
    };
    fetchTasksList();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      changeTask();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [currentTab]);

  const changeTask = async () => {
    try {
      const tasks = await fetchTasks(currentTab);

      setAllTask(tasks.data);
      setInfo(tasks.info);
    } catch (e: any) {
      setError(e.message || 'Failed to change task. Please try again later.');
      return;
    }
  };

  const changeTab = async (tab: TabKeys) => {
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
    <>
      <Divider orientation='left'>TodoList</Divider>
      <section>
        {isLoading ? (
          <LoadingOutlined />
        ) : (
          <>
            {error && (
              <Alert
                style={{ width: 'fit-content', marginBottom: 15 }}
                message={error}
                type='error'
                showIcon
                closable
              />
            )}
            <AddTask changeTask={changeTask} />
            <TabList info={info} changeTab={changeTab} />
            <TaskList tasks={allTask} changeTask={changeTask} />
          </>
        )}
      </section>
    </>
  );
};
