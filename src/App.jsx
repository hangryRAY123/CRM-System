import './App.css';
import { useState, useEffect } from 'react';
import { AddTask } from './components/AddTask/AddTask';
import { TabsList } from './components/Tabs/TabsList';
import { TasksList } from './components/Tasks/TasksList';
import { addingTask, fetchTasks, deleteTask, updateTask } from './https';

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

  const handleAddTask = async (form) => {
    form.preventDefault();
    const newTask = form.target[0].value;

    if (newTask.length >= 2 && newTask.length <= 64) {
      try {
        await addingTask(newTask);
        form.target.reset();

        const tasks = await fetchTasks(currentTab);

        setAllTask(tasks.data);
        setInfo(tasks.info);
      } catch (e) {
        setError(e.message || 'Failed to add task. Please try again later.');
        return;
      }

      setError('');
    } else {
      setError('Task title should be between 2 and 64 characters long.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);

      const tasks = await fetchTasks(currentTab);

      setAllTask(tasks.data);
      setInfo(tasks.info);
    } catch (e) {
      setError(e.message || 'Failed to delete task. Please try again later.');
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

  const handleUpdateTask = async (isDone, id, title) => {
    if (title.length >= 2 && title.length <= 64) {
      try {
        await updateTask(isDone, id, title);

        const tasks = await fetchTasks(currentTab);

        setAllTask(tasks.data);
        setInfo(tasks.info);
      } catch (e) {
        setError(e.message || 'Failed update task.');
        return;
      }

      setError('');
    } else {
      setError('Task title should be between 2 and 64 characters long.');
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <AddTask handleAddTask={handleAddTask} />
          <TabsList info={info} handleTabChange={handleTabChange} currentTab={currentTab} />
          <TasksList
            tasks={allTask}
            deleteTask={handleDeleteTask}
            handleUpdateTask={handleUpdateTask}
          />
        </>
      )}
    </>
  );
}

export default App;
