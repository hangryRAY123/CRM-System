import {
  getUsers,
  deleteUser,
  sortUsers,
  rolesUser,
  blockUser,
  getUserProfile,
  updateUserProfile,
} from '../../api/https';
import { userAction } from './user-slice';
import { profileAction } from '../profile/profile-slice';
import { AccessToken, ProfileRequest } from '../../helpers/types';
import { notificationsAction } from '../notification/notifications-slice';

export const updateUserProfileData = (id: number, token: AccessToken, user: ProfileRequest) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type: 'user/setUserProfile' | 'notifications/setError' | 'profile/setIsEdit';
    }) => void
  ) => {
    try {
      const res = await updateUserProfile(id, token, user);
      dispatch(userAction.setUserProfile(res));
      dispatch(profileAction.setIsEdit(false as any));
      dispatch(notificationsAction.setError(''));
    } catch (error: any) {
      dispatch(notificationsAction.setError(error.message));
    }
  };
};

export const getUserProfileData = (id: number, token: AccessToken) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type: 'user/setUserProfile' | 'notifications/setError';
    }) => void
  ) => {
    try {
      const res = await getUserProfile(id, token);
      dispatch(userAction.setUserProfile(res));
    } catch (error: any) {
      dispatch(notificationsAction.setError(error.message));
    }
  };
};

export const rolesUserData = (id: number, token: AccessToken, sort: string, roles: string[]) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type: 'user/setUsers' | 'user/setIsLoading' | 'notifications/setError';
    }) => void
  ) => {
    try {
      dispatch(userAction.setIsLoading(true));
      await rolesUser(id, token, roles);
      const res = await sortUsers(sort, token);
      dispatch(userAction.setUsers(res.data));
      dispatch(userAction.setIsLoading(false));
    } catch (error: any) {
      dispatch(notificationsAction.setError(error.message));
    }
  };
};

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
