import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://easydev.club/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const updateTask = (isDone: boolean, id: number, title: string) => {
  return instance
    .put(`/todos/${id}`, { isDone, title })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error.message || 'Failed to update task. Please try again later.');
    });
};

export const deleteTask = (taskId: number) => {
  return instance
    .delete(`/todos/${taskId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error.message || 'Failed to delete task. Please try again later.');
    });
};

export const fetchTasks = (tab = 'all') => {
  return instance
    .get(`/todos?filter=${tab}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error.message || 'Failed to fetch tasks. Please try again later.');
    });
};

export const addingTask = (title: string) => {
  return instance
    .post('/todos', { isDone: false, title })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error.message || 'Failed to add task. Please try again later.');
    });
};
