import { instance } from './https';
import { UserRegistration, AuthData, RefreshToken } from '../helpers/types';

export const logOut = async () => {
  try {
    await instance.post('/user/logout');
  } catch (error: any) {
    throw new Error(error.response.data || 'Failed to log out. Please try again later.');
  }
};

export const updateToken = async (token: RefreshToken) => {
  const res = await instance.post('/auth/refresh', {
    refreshToken: token,
  });
  return res.data;
};

export const authUser = async (user: AuthData) => {
  const res = await instance.post('/auth/signin', user);
  return res.data;
};

export const regUser = async (user: UserRegistration) => {
  await instance.post('/auth/signup', user);
};
