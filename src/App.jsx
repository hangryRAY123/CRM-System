import './App.css';
import { useState, useEffect } from 'react';
import { AddTask } from './components/AddTask/AddTask';
import { Tasks } from './components/Tasks/Tasks';
import { addingTask, fetchTasks, deleteTask } from './https';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [task, setTask] = useState('');
  const [allTask, setAllTask] = useState({});
  const [currentTab, setCurrentTab] = useState('all');

  useEffect(() => {
    const fetchTasksList = async () => {
      setIsLoading(true);

      try {
        const tasks = await fetchTasks();
        setAllTask(tasks);
      } catch (error) {
        setError({ mesage: error.message || 'Failed to fetch tasks.' });
      }

      setIsLoading(false);
    };
    fetchTasksList();
  }, []);

  const handleToggleDone = async () => {
    try {
      await addingTask(task);
      setTask('');

      const tasks = await fetchTasks(currentTab);
      await setAllTask(tasks);
    } catch (error) {
      setError({ message: error.message || 'Failed to add task. Please try again later.' });
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);

      const tasks = await fetchTasks(currentTab);
      await setAllTask(tasks);
    } catch (error) {
      setError({ message: error || 'Failed to delete task. Please try again later.' });
    }
  };

  const handleAddTask = (event) => {
    setTask(event.target.value);
  };

  const handleTabChange = async (tab) => {
    try {
      const tasks = await fetchTasks(tab);
      await setAllTask(tasks);
      await setCurrentTab(tab);
    } catch (error) {
      setError({ message: error || 'Failed change task.' });
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {error && <div>{error.message}</div>}
          <AddTask task={task} handleAddTask={handleAddTask} handleToggleDone={handleToggleDone} />
          <Tasks
            info={allTask.info}
            tasks={allTask.data}
            deleteTask={handleDeleteTask}
            handleTabChange={handleTabChange}
            currentTab={currentTab}
          />
        </>
      )}
    </>
  );
}

export default App;
