import './App.css';
import { useState, useEffect } from 'react';
import { AddTask } from './components/AddTask/AddTask';
import { Tasks } from './components/Tasks/Tasks';
import { addingTask, fetchTasks } from './https';

function App() {
  const [error, setError] = useState('');
  const [task, setTask] = useState('');
  const [allTask, setAllTask] = useState([]);

  useEffect(() => {
    const fetchTasksList = async () => {
      try {
        const tasks = await fetchTasks();
        setAllTask(tasks);
      } catch (error) {
        setError({ mesage: error.message || 'Failed to fetch tasks.' });
      }
    };
    fetchTasksList();
  }, []);

  const handleAddTask = (event) => {
    setTask(event.target.value);
  };

  const handleToggleDone = async () => {
    try {
      await addingTask(task);
      setTask('');

      const tasks = await fetchTasks();
      setAllTask(tasks);
    } catch (error) {
      setError({ message: error.message || 'Failed to add task. Please try again later.' });
    }
  };

  return (
    <>
      {error && <div>{error.message}</div>}
      <AddTask task={task} handleAddTask={handleAddTask} handleToggleDone={handleToggleDone} />
      <Tasks tasks={allTask} />
    </>
  );
}

export default App;
