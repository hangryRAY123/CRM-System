import axios from 'axios';
import { TabKeys, UserRegistration, AuthData } from '../helpers/types';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://easydev.club/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const logOut = async () => {
  try {
    const res = await instance.get('/user/profile');
    console.log(res);
  } catch (error: any) {
    throw new Error(error.message || 'Failed to log out. Please try again later.');
  }
};

export const updateToken = async (refreshToken: string) => {
  try {
    const response = await instance.post('/auth/refresh', { refreshToken });

    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to refresh token. Please try again later.');
  }
};

export const authUser = async (user: AuthData) => {
  try {
    const response = await instance.post('/auth/signin', user);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data || 'Failed to authenticate user. Please try again later.');
  }
};

export const regUser = async (user: UserRegistration) => {
  try {
    await instance.post('/auth/signup', user);
  } catch (error: any) {
    throw new Error(error.response.data || 'Failed to register user. Please try again later.');
  }
};

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
    const response = await instance.get('/todos', {
      params: {
        filter: tab,
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch tasks. Please try again later.');
  }
};

export const addingTask = async (title: string) => {
  try {
    await instance.post('/todos', { isDone: false, title });
  } catch (error: any) {
    throw new Error(error.message || 'Failed to add task. Please try again later.');
  }
};
