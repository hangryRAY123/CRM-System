import { notificationsAction } from '../notification/notifications';
import { authUser, updateToken } from '../../api/https';
import { authAction } from './auth-slice';
import { AuthData } from '../../helpers/types';

export const authUserData = (user: AuthData) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type: 'auth/setIsAuth' | 'notifications/setError' | 'notifications/setSuccess';
    }) => void
  ) => {
    try {
      const res = await authUser(user);
      dispatch(authAction.setIsAuth(true));
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      dispatch(notificationsAction.setError(''));
      dispatch(notificationsAction.setSuccess('successfully registered'));
    } catch (error: any) {
      dispatch(notificationsAction.setError(error.message));
      dispatch(notificationsAction.setSuccess(''));
    }
  };
};

export const updateRefrashToken = (token: string) => {
  return async () => {
    try {
      await updateToken(token);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to refresh token. Please try again later.');
    }
  };
};
