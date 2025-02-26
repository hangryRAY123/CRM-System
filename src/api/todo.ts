import { instance } from './https';
import { TabKeys } from '../helpers/types';

export const updateTask = async (isDone: boolean, id: number, title: string) => {
  try {
    await instance.put(`/todos/${id}`, { isDone, title });
  } catch (error: any) {
    throw new Error(error.message || 'Failed to update task. Please try again later.');
  }
};

export const deleteTask = async (taskId: number) => {
  try {
    await instance.delete(`/todos/${taskId}`);
  } catch (error: any) {
    throw new Error(error.message || 'Failed to delete task. Please try again later.');
  }
};

export const fetchTasks = async (tab: TabKeys) => {
  try {
    const res = await instance.get('/todos', {
      params: {
        filter: tab,
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch tasks. Please try again later.');
  }
};

export const addTask = async (title: string) => {
  try {
    await instance.post('/todos', { isDone: false, title });
  } catch (error: any) {
    throw new Error(error.message || 'Failed to add task. Please try again later.');
  }
};
