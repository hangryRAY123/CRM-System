import './App.css';
import { useState, useEffect } from 'react';
import { AddTask } from './components/AddTask/AddTask';
import { Tasks } from './components/Tasks/Tasks';
import { addingTask, fetchTasks, deleteTask, updateTask } from './https';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [task, setTask] = useState('');
  const [allTask, setAllTask] = useState({});
  const [currentTab, setCurrentTab] = useState('all');
  const [changeTask, setChangeTask] = useState({});

  useEffect(() => {
    const fetchTasksList = async () => {
      setIsLoading(true);

      try {
        const tasks = await fetchTasks();
        setAllTask(tasks);

        tasks.data.forEach((element) => {
          setChangeTask((prev) => {
            return {
              ...prev,
              [element.id]: element.title,
            };
          });
        });
      } catch (error) {
        setError({ mesage: error.message || 'Failed to fetch tasks.' });
      }

      setIsLoading(false);
    };
    fetchTasksList();
  }, []);

  const handleToggleDone = async () => {
    if (task.length >= 2 && task.length <= 64) {
      try {
        await addingTask(task);
        
        setTask('');

        const tasks = await fetchTasks(currentTab);

        await setAllTask(tasks);

        tasks.data.forEach((element) => {
          setChangeTask((prev) => {
            return {
              ...prev,
              [element.id]: element.title,
            };
          });
        });
      } catch (error) {
        setError({ message: error.message || 'Failed to add task. Please try again later.' });
      }

      setError({
        message: '',
      });
    } else {
      setError({
        message: 'Task title should be between 2 and 64 characters long.',
      });
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

  const handleTabChange = async (tab) => {
    try {
      const tasks = await fetchTasks(tab);

      await setAllTask(tasks);
      await setCurrentTab(tab);
    } catch (error) {
      setError({ message: error || 'Failed change task.' });
    }
  };

  const handleUpdateTask = async (isDone, id, title) => {
    if (title.length >= 2 && title.length <= 64) {
      try {
        await updateTask(isDone, id, title);

        const tasks = await fetchTasks(currentTab);

        await setAllTask(tasks);
      } catch (error) {
        setError({ message: error || 'Failed update task.' });
      }

      setError({
        message: '',
      });
    } else {
      setError({
        message: 'Task title should be between 2 and 64 characters long.',
      });
    }
  };

  const handleAddTask = (event) => {
    setTask(event.target.value);
  };

  const handleChangeTask = (id, title) => {
    setChangeTask((prevUserInput) => {
      return {
        ...prevUserInput,
        [id]: title,
      };
    });
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {error && <div style={{ color: 'red' }}>{error.message}</div>}
          <AddTask task={task} handleAddTask={handleAddTask} handleToggleDone={handleToggleDone} />
          <Tasks
            info={allTask.info}
            tasks={allTask.data}
            deleteTask={handleDeleteTask}
            handleTabChange={handleTabChange}
            currentTab={currentTab}
            handleChangeTask={handleChangeTask}
            changeTask={changeTask}
            handleUpdateTask={handleUpdateTask}
          />
        </>
      )}
    </>
  );
}

export default App;
