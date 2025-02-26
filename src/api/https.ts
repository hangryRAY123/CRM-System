import axios from 'axios';
import TokenManager from '../helpers/token-manager';

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://easydev.club/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  function (config) {
    const token = TokenManager.getToken();
    config.headers.Authorization = token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
