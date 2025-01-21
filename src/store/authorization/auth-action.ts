import { notificationsAction } from '../notification/notifications-slice';
import { authUser, updateToken, logOut } from '../../api/https';
import { authAction } from './auth-slice';
import { userAction } from '../user/user-slice';
import { AuthData } from '../../helpers/types';
import { userState } from '../user/user-slice';
import { authState } from './auth-slice';
import TokenManager from '../../helpers/token-manager';

export const authUserData = (user: AuthData) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type: 'auth/setIsAuth' | 'notifications/setError' | 'notifications/setSuccess';
    }) => void
  ) => {
    try {
      const res = await authUser(user);
      TokenManager.setToken(res.accessToken);
      dispatch(authAction.setIsAuth(true));
      dispatch(notificationsAction.setError(''));
      dispatch(notificationsAction.setSuccess('successfully registered'));
    } catch (error: any) {
      dispatch(notificationsAction.setError(error.message));
      dispatch(notificationsAction.setSuccess(''));
    }
  };
};

export const updateRefrashToken = () => {
  return async (dispatch: (arg0: { payload: any; type: 'auth/setIsAuth' }) => void) => {
    try {
      const res = await updateToken();
      TokenManager.setToken(res.accessToken);
      dispatch(authAction.setIsAuth(true));
    } catch (error: any) {
      dispatch(authAction.setIsAuth(false));
      throw new Error(error.message || 'Failed to refresh token. Please try again later.');
    }
  };
};

export const logOutUser = (token: string) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type: 'auth/setIsAuth' | 'user/setUser' | 'auth/setAuthData';
    }) => void
  ) => {
    try {
      await logOut(token);
      TokenManager.clearToken();
      dispatch(authAction.setAuthData(authState.data));
      dispatch(userAction.setUser(userState.data));
      dispatch(authAction.setIsAuth(false));
    } catch {
      throw new Error('Failed to log out. Please try again later.');
    }
  };
};
