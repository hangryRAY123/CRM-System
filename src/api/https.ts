import axios from 'axios';
import {
  TabKeys,
  UserRegistration,
  AuthData,
  ProfileRequest,
  PasswordRequest,
  AccessToken,
} from '../helpers/types';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://easydev.club/api/v2/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sortUsers = async (sort: string, accessToken: AccessToken) => {
  try {
    instance.defaults.headers.Authorization = accessToken;
    const res = await instance.get(`/admin/users?${sort ? sort + '&limit=200' : 'limit=200'}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data || 'Failed to sort users. Please try again later.');
  }
};

export const deleteUser = async (id: number, accessToken: AccessToken) => {
  try {
    instance.defaults.headers.Authorization = accessToken;
    await instance.delete(`/admin/users/${id}`);
  } catch (error: any) {
    throw new Error(error.response.data || 'Failed to delete user. Please try again later.');
  }
};

export const getUsers = async (accessToken: AccessToken) => {
  try {
    instance.defaults.headers.Authorization = accessToken;
    const res = await instance.get('/admin/users?limit=200');

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data || 'Failed to fetch users. Please try again later.');
  }
};

export const updatePaswword = async (password: PasswordRequest, accessToken: AccessToken) => {
  try {
    instance.defaults.headers.Authorization = accessToken;
    const res = await instance.put('/user/profile/reset-password', password);

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data || 'Failed to update password. Please try again later.');
  }
};

export const updateProfile = async (user: ProfileRequest, accessToken: AccessToken) => {
  try {
    instance.defaults.headers.Authorization = accessToken;
    const res = await instance.put('/user/profile', user);

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data || 'Failed to fetch user data. Please try again later.');
  }
};

export const getProfile = async (accessToken: AccessToken) => {
  try {
    instance.defaults.headers.Authorization = accessToken;
    const res = await instance.get('/user/profile');

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data || 'Failed to fetch user data. Please try again later.');
  }
};

export const logOut = async (accessToken: AccessToken) => {
  try {
    instance.defaults.headers.Authorization = accessToken;
    await instance.post('/user/logout');
  } catch (error: any) {
    throw new Error(error.response.data || 'Failed to log out. Please try again later.');
  }
};

export const updateToken = async () => {
  try {
    const res = await instance.post('/auth/refresh');

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data || 'Failed to refresh token. Please try again later.');
  }
};

export const authUser = async (user: AuthData) => {
  try {
    const res = await instance.post('/auth/signin', user);

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data || 'Failed to authenticate user. Please try again later.');
  }
};

export const regUser = async (user: UserRegistration) => {
  try {
    await instance.post('/auth/signup', user);
  } catch (error: any) {
    throw new Error(error.res.data || 'Failed to register user. Please try again later.');
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

export const addingTask = async (title: string) => {
  try {
    await instance.post('/todos', { isDone: false, title });
  } catch (error: any) {
    throw new Error(error.message || 'Failed to add task. Please try again later.');
  }
};
