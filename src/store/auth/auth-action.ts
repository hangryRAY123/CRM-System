import { authUser, updateToken, logOut } from '../../api/auth';
import { getProfile } from '../../api/profile';
import { authAction } from './auth-slice';
import { notificationsAction } from '../notification/notifications-slice';
import { AuthData, RefreshToken } from '../../helpers/types';
import TokenManager from '../../helpers/token-manager';

export const authUserData = (user: AuthData) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type:
        | 'auth/checkRole'
        | 'auth/setIsAuth'
        | 'notifications/setError'
        | 'notifications/setSuccess';
    }) => void
  ) => {
    try {
      const res = await authUser(user);
      TokenManager.setToken(res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);

      const profile = await getProfile();
      dispatch(authAction.setIsAuth(true));
      dispatch(authAction.checkRole(profile));
      dispatch(notificationsAction.setError(''));
    } catch (error: any) {
      dispatch(
        notificationsAction.setError(
          error.response.data || 'Failed to authenticate user. Please try again later.'
        )
      );
    }
  };
};

export const updateRefrashToken = (refreshToken: RefreshToken) => {
  return async (
    dispatch: (arg0: { payload: any; type: 'auth/setIsAuth' | 'auth/checkRole' }) => void
  ) => {
    try {
      const res = await updateToken(refreshToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      TokenManager.setToken(res.accessToken);

      const profile = await getProfile();
      dispatch(authAction.setIsAuth(true));
      dispatch(authAction.checkRole(profile));
    } catch (error: any) {
      dispatch(authAction.setIsAuth(false));
      throw new Error(error.response.data || 'Failed to refresh token. Please try again later.');
    }
  };
};

export const logOutUser = () => {
  return async (dispatch: (arg0: { payload: any; type: 'auth/setIsAuth' }) => void) => {
    try {
      await logOut();
      TokenManager.clearToken();
      dispatch(authAction.setIsAuth(false));
    } catch {
      throw new Error('Failed to log out. Please try again later.');
    }
  };
};
