import { ProfileRequest, PasswordRequest } from '../../helpers/types';
import { getProfile, updatePaswword, updateProfile } from '../../api/profile';
import { notificationsAction } from '../notification/notifications-slice';
import { profileAction } from './profile-slice';
export const getProfileData = () => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type: 'profile/setProfile' | 'notifications/setError';
    }) => void
  ) => {
    const res = await getProfile();
    dispatch(profileAction.setProfile(res));
    try {
    } catch (error: any) {
      dispatch(
        notificationsAction.setError(
          error.response.data || 'Failed to fetch user data. Please try again later.'
        )
      );
    }
  };
};

export const updateProfileData = (user: ProfileRequest) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type: 'profile/setProfile' | 'notifications/setError' | 'profile/setIsEdit';
    }) => void
  ) => {
    try {
      const res = await updateProfile(user);
      dispatch(profileAction.setProfile(res));
      dispatch(profileAction.setIsEdit(false as any));
      dispatch(notificationsAction.setError(''));
    } catch (error: any) {
      dispatch(
        notificationsAction.setError(
          error.response.data || 'Failed to fetch user data. Please try again later.'
        )
      );
    }
  };
};

export const updatePasswordData = (password: PasswordRequest) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type: 'notifications/setError' | 'notifications/setSuccess';
    }) => void
  ) => {
    try {
      await updatePaswword(password);
      dispatch(notificationsAction.setSuccess('Password changed successfully'));
      dispatch(notificationsAction.setError(''));
    } catch (error: any) {
      dispatch(
        notificationsAction.setError(
          error.response.data || 'Failed to update password. Please try again later.'
        )
      );
    }
  };
};
