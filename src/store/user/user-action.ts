import { blockUser } from './../../api/https';
import { getUsers, deleteUser, sortUsers } from '../../api/https';
import { userAction } from './user-slice';
import { AccessToken } from '../../helpers/types';
import { notificationsAction } from '../notification/notifications-slice';

export const blockUserData = (id: number, token: AccessToken, sort: string, block: string) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type: 'user/setUsers' | 'user/setIsLoading' | 'notifications/setError';
    }) => void
  ) => {
    try {
      dispatch(userAction.setIsLoading(true));
      await blockUser(id, token, block);
      const res = await sortUsers(sort, token);
      dispatch(userAction.setUsers(res.data));
      dispatch(userAction.setIsLoading(false));
    } catch (error: any) {
      dispatch(notificationsAction.setError(error.message));
    }
  };
};

export const sortUserData = (sort: string, token: AccessToken) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type: 'user/setUsers' | 'user/setIsLoading' | 'notifications/setError';
    }) => void
  ) => {
    try {
      dispatch(userAction.setIsLoading(true));
      const res = await sortUsers(sort, token);
      dispatch(userAction.setUsers(res.data));
      dispatch(userAction.setIsLoading(false));
    } catch (error: any) {
      dispatch(userAction.setIsLoading(false));
      dispatch(notificationsAction.setError(error.message));
    }
  };
};

export const deleteUserData = (id: number, token: AccessToken, sort: string) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type: 'user/setUsers' | 'user/setIsLoading' | 'notifications/setError';
    }) => void
  ) => {
    try {
      dispatch(userAction.setIsLoading(true));
      await deleteUser(id, token);
      const res = await sortUsers(sort, token);
      dispatch(userAction.setUsers(res.data));
      dispatch(userAction.setIsLoading(false));
    } catch (error: any) {
      dispatch(notificationsAction.setError(error.message));
    }
  };
};

export const getUsersData = (token: AccessToken) => {
  return async (
    dispatch: (arg0: { payload: any; type: 'user/setUsers' | 'notifications/setError' }) => void
  ) => {
    try {
      const res = await getUsers(token);
      dispatch(userAction.setUsers(res.data));
    } catch (error: any) {
      dispatch(notificationsAction.setError(error.message));
    }
  };
};
