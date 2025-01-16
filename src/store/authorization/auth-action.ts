import { notificationsAction } from '../notification/notifications';
import { authUser, updateToken, logOut } from '../../api/https';
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
  return async (dispatch: (arg0: { payload: any; type: 'auth/setIsAuth' }) => void) => {
    try {
      const res = await updateToken(token);

      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      dispatch(authAction.setIsAuth(true));
    } catch (error: any) {
      dispatch(authAction.setIsAuth(false));
      throw new Error(error.message || 'Failed to refresh token. Please try again later.');
    }
  };
};

export const logOutUser = (token: string) => {
  return async (
    dispatch: (arg0: { payload: any; type: 'auth/setIsAuth' | 'auth/setAuthData' }) => void
  ) => {
    try {
      await logOut(token);
      dispatch(authAction.setAuthData({ login: '', password: '' }));
      dispatch(authAction.setIsAuth(false));
      localStorage.setItem('accessToken', '');
      localStorage.setItem('refreshToken', '');
    } catch {
      throw new Error('Failed to log out. Please try again later.');
    }
  };
};
