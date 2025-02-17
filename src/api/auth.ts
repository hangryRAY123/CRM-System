import { instance } from './https';
import { UserRegistration, AuthData, RefreshToken } from '../helpers/types';

export const logOut = async () => {
  await instance.post('/user/logout');
};

export const updateToken = async (token: RefreshToken) => {
  const res = await instance.post('/auth/refresh', {
    refreshToken: token,
  });
  return res.data;
};

export const authorizeUser = async (user: AuthData) => {
  const res = await instance.post('/auth/signin', user);
  return res.data;
};

export const registerUser = async (user: UserRegistration) => {
  await instance.post('/auth/signup', user);
};
