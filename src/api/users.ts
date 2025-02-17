import { instance } from './https';
import { ProfileRequest } from '../helpers/types';
import { Sort } from '../helpers/types';

export const updateUserProfile = async (id: number, user: ProfileRequest) => {
  const res = await instance.put(`/admin/users/${id}`, user);
  return res.data;
};

export const getUserProfile = async (id: number) => {
  const res = await instance.get(`/admin/users/${id}`);
  return res.data;
};

export const updateRolesUser = async (id: number, roles: string[]) => {
  await instance.post(`/admin/users/${id}/rights`, { roles: roles });
};

export const blockUser = async (id: number, block: string) => {
  await instance.post(`/admin/users/${id}/${block}`);
};

export const getUsers = async (sort: Sort) => {
  const res = await instance.get('/admin/users', {
    params: sort,
  });
  return res.data;
};

export const deleteUser = async (id: number) => {
  await instance.delete(`/admin/users/${id}`);
};
