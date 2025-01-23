import { notificationsAction } from '../notification/notifications-slice';
import { authUser, updateToken, logOut, getProfile } from '../../api/https';
import { authAction } from './auth-slice';
import { profileAction } from '../profile/profile-slice';
import { AuthData, AccessToken } from '../../helpers/types';
import { profileState } from '../profile/profile-slice';
import { authState } from './auth-slice';
import TokenManager from '../../helpers/token-manager';

export const authUserData = (user: AuthData) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type:
        | 'profile/setProfile'
        | 'profile/checkRole'
        | 'auth/setIsAuth'
        | 'notifications/setError'
        | 'notifications/setSuccess';
    }) => void
  ) => {
    try {
      const res = await authUser(user);
      TokenManager.setToken(res.accessToken);
      const token = <AccessToken>TokenManager.getToken();
      const profile = await getProfile(token);
      dispatch(profileAction.setProfile(profile));
      dispatch(authAction.setIsAuth(true));
      dispatch(profileAction.checkRole('ADMIN'));
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

export const logOutUser = (token: AccessToken) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type: 'auth/setIsAuth' | 'profile/setProfile' | 'auth/setAuthData';
    }) => void
  ) => {
    try {
      await logOut(token);
      TokenManager.clearToken();
      dispatch(authAction.setAuthData(authState.data));
      dispatch(profileAction.setProfile(profileState.data));
      dispatch(authAction.setIsAuth(false));
    } catch {
      throw new Error('Failed to log out. Please try again later.');
    }
  };
};
