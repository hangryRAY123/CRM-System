import { instance } from './https';

import { ProfileRequest, PasswordRequest } from '../helpers/types';

export const updatePaswword = async (password: PasswordRequest) => {
  const res = await instance.put('/user/profile/reset-password', password);
  return res.data;
};

export const updateProfile = async (user: ProfileRequest) => {
  const res = await instance.put('/user/profile', user);
  return res.data;
};

export const getProfile = async () => {
  const res = await instance.get('/user/profile');
  return res.data;
};
