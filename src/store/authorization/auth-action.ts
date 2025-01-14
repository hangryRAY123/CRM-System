import { notificationsAction } from '../notification/notifications';
import { authUser } from '../../api/https';
import { authAction } from './auth-slice';
import { UserRegistration } from '../../helpers/types';

export const authUserData = (user: UserRegistration) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type:
        | 'auth/setAuthData'
        | 'auth/setIsAuth'
        | 'notifications/setError'
        | 'notifications/setSuccess';
    }) => void
  ) => {
    try {
      await authUser(user);

      dispatch(authAction.setAuthData(user));
      dispatch(authAction.setIsAuth(true));
      dispatch(notificationsAction.setError(''));
      dispatch(notificationsAction.setSuccess('successfully registered'));
    } catch (error: any) {
      console.log('auth-action');
      dispatch(notificationsAction.setError(error.message));
      dispatch(notificationsAction.setSuccess(''));
    }
  };
};
