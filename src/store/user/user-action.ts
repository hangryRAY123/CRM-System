import {
  getUsers,
  deleteUser,
  sortUsers,
  updateRolesUser,
  blockUser,
  getUserProfile,
  updateUserProfile,
} from '../../api/users';
import { userAction } from './user-slice';
import { profileAction } from '../profile/profile-slice';
import { ProfileRequest } from '../../helpers/types';
import { notificationsAction } from '../notification/notifications-slice';

export const updateUserProfileData = (id: number, user: ProfileRequest) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type: 'user/setUserProfile' | 'notifications/setError' | 'profile/setIsEdit';
    }) => void
  ) => {
    try {
      const res = await updateUserProfile(id, user);
      dispatch(userAction.setUserProfile(res));
      dispatch(profileAction.setIsEdit(false as any));
      dispatch(notificationsAction.setError(''));
    } catch (error: any) {
      dispatch(
        notificationsAction.setError(
          error.response.data || 'Failed to get user profile. Please try again later.'
        )
      );
    }
  };
};

export const getUserProfileData = (id: number) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type: 'user/setUserProfile' | 'notifications/setError';
    }) => void
  ) => {
    try {
      const res = await getUserProfile(id);
      dispatch(userAction.setUserProfile(res));
    } catch (error: any) {
      dispatch(
        notificationsAction.setError(
          error.response.data || 'Failed to get user profile. Please try again later.'
        )
      );
    }
  };
};

export const updateRolesUserData = (id: number, sort: string, roles: string[]) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type: 'user/setUsers' | 'user/setIsLoading' | 'notifications/setError';
    }) => void
  ) => {
    try {
      dispatch(userAction.setIsLoading(true));
      await updateRolesUser(id, roles);
      const res = await sortUsers(sort);
      dispatch(userAction.setUsers(res.data));
      dispatch(userAction.setIsLoading(false));
    } catch (error: any) {
      dispatch(
        notificationsAction.setError(
          error.response.data || 'Failed to change user role. Please try again later.'
        )
      );
    }
  };
};

export const blockUserData = (id: number, sort: string, block: string) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type: 'user/setUsers' | 'user/setIsLoading' | 'notifications/setError';
    }) => void
  ) => {
    try {
      dispatch(userAction.setIsLoading(true));
      await blockUser(id, block);
      const res = await sortUsers(sort);
      dispatch(userAction.setUsers(res.data));
      dispatch(userAction.setIsLoading(false));
    } catch (error: any) {
      dispatch(
        notificationsAction.setError(
          error.response.data || 'Failed to block user. Please try again later.'
        )
      );
    }
  };
};

export const sortUserData = (sort: string) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type: 'user/setUsers' | 'user/setIsLoading' | 'user/setTotal' | 'notifications/setError';
    }) => void
  ) => {
    try {
      dispatch(userAction.setIsLoading(true));
      const res = await sortUsers(sort);
      dispatch(userAction.setUsers(res.data));
      dispatch(userAction.setTotal(res.meta.totalAmount));
      dispatch(userAction.setIsLoading(false));
    } catch (error: any) {
      dispatch(userAction.setIsLoading(false));
      dispatch(
        notificationsAction.setError(
          error.response.data || 'Failed to sort users. Please try again later.'
        )
      );
    }
  };
};

export const deleteUserData = (id: number, sort: string) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type: 'user/setUsers' | 'user/setIsLoading' | 'notifications/setError';
    }) => void
  ) => {
    try {
      dispatch(userAction.setIsLoading(true));
      await deleteUser(id);
      const res = await sortUsers(sort);
      dispatch(userAction.setUsers(res.data));
      dispatch(userAction.setIsLoading(false));
    } catch (error: any) {
      dispatch(
        notificationsAction.setError(
          error.response.data || 'Failed to delete user. Please try again later.'
        )
      );
    }
  };
};

export const getUsersData = () => {
  return async (
    dispatch: (arg0: { payload: any; type: 'user/setUsers' | 'notifications/setError' }) => void
  ) => {
    try {
      const res = await getUsers();
      dispatch(userAction.setUsers(res.data));
    } catch (error: any) {
      dispatch(
        notificationsAction.setError(
          error.response.data || 'Failed to fetch users. Please try again later.'
        )
      );
    }
  };
};
