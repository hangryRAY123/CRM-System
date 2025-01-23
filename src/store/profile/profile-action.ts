import { ProfileRequest, AccessToken, PasswordRequest } from '../../helpers/types';
import { getProfile, updatePaswword, updateProfile } from '../../api/https';
import { notificationsAction } from '../notification/notifications-slice';
import { profileAction } from './profile-slice';
export const getProfileData = (token: AccessToken) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type: 'profile/setProfile' | 'notifications/setError';
    }) => void
  ) => {
    const res = await getProfile(token);
    dispatch(profileAction.setProfile(res));
    try {
    } catch (error: any) {
      dispatch(notificationsAction.setError(error.message || 'Failed to load user data'));
    }
  };
};

export const updateProfileData = (user: ProfileRequest, token: AccessToken) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type: 'profile/setProfile' | 'notifications/setError' | 'profile/setIsEdit';
    }) => void
  ) => {
    try {
      const res = await updateProfile(user, token);
      dispatch(profileAction.setProfile(res));
      dispatch(profileAction.setIsEdit(false as any));
      dispatch(notificationsAction.setError(''));
    } catch (error: any) {
      dispatch(notificationsAction.setError(error.message || 'Failed to update user data'));
    }
  };
};

export const updatePasswordData = (password: PasswordRequest, token: AccessToken) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type: 'notifications/setError' | 'notifications/setSuccess';
    }) => void
  ) => {
    try {
      await updatePaswword(password, token);
      dispatch(notificationsAction.setSuccess('Password changed successfully'));
      dispatch(notificationsAction.setError(''));
    } catch (error: any) {
      dispatch(notificationsAction.setError(error.message || 'Failed to update password'));
    }
  };
};
