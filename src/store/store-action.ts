import { authUser, updateToken, logOut } from './../api/auth';
import { getProfile } from './../api/profile';
import { storeAction } from './store-slice';
import { AuthData, RefreshToken } from '../helpers/types';
import TokenManager from '../helpers/token-manager';

export const authUserData = (user: AuthData) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type: 'store/checkRole' | 'store/setIsAuth' | 'store/setError' | 'store/setSuccess';
    }) => void
  ) => {
    try {
      const res = await authUser(user);
      TokenManager.setToken(res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);

      const profile = await getProfile();
      dispatch(storeAction.setIsAuth(true));
      dispatch(storeAction.checkRole(profile));
      dispatch(storeAction.setError(''));
    } catch (error: any) {
      dispatch(
        storeAction.setError(
          error.response.data || 'Failed to authenticate user. Please try again later.'
        )
      );
    }
  };
};

export const updateRefrashToken = (refreshToken: RefreshToken) => {
  return async (
    dispatch: (arg0: { payload: any; type: 'store/setIsAuth' | 'store/checkRole' }) => void
  ) => {
    try {
      const res = await updateToken(refreshToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      TokenManager.setToken(res.accessToken);

      const profile = await getProfile();
      dispatch(storeAction.setIsAuth(true));
      dispatch(storeAction.checkRole(profile));
    } catch (error: any) {
      dispatch(storeAction.setIsAuth(false));
      throw new Error(error.response.data || 'Failed to refresh token. Please try again later.');
    }
  };
};

export const logOutUser = () => {
  return async (dispatch: (arg0: { payload: any; type: 'store/setIsAuth' }) => void) => {
    try {
      await logOut();
      TokenManager.clearToken();
      dispatch(storeAction.setIsAuth(false));
    } catch {
      throw new Error('Failed to log out. Please try again later.');
    }
  };
};
