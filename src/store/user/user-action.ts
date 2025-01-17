import { ProfileRequest } from './../../helpers/types';
import { getUser, updateUser } from './../../api/https';
import { notificationsAction } from '../notification/notifications-slice';
import { userAction } from './user-slice';
export const getUserData = (token: string) => {
  return async (
    dispatch: (arg0: { payload: any; type: 'user/setUser' | 'notifications/setError' }) => void
  ) => {
    const res = await getUser(token);

    dispatch(userAction.setUser(res));
    try {
    } catch (error: any) {
      dispatch(notificationsAction.setError(error.message || 'Failed to load user data'));
    }
  };
};

export const updateUserData = (user: ProfileRequest, token: string) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type: 'user/setUser' | 'notifications/setError' | 'user/setIsEdit';
    }) => void
  ) => {
    try {
      const res = await updateUser(user, token);

      dispatch(userAction.setUser(res));
      dispatch(userAction.setIsEdit(false as any));
      dispatch(notificationsAction.setError(''));
    } catch (error: any) {
      dispatch(notificationsAction.setError(error.message || 'Failed to update user data'));
    }
  };
};
