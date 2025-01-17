import { notificationsAction } from '../notification/notifications-slice';
import { regUser } from '../../api/https';
import { regAction } from './reg-slice';
import { UserRegistration } from '../../helpers/types';

export const regUserData = (user: UserRegistration) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type: 'reg/setRegistrationData' | 'notifications/setError' | 'notifications/setSuccess';
    }) => void
  ) => {
    try {
      await regUser(user);

      dispatch(regAction.setRegistrationData(user));
      dispatch(notificationsAction.setError(''));
      dispatch(notificationsAction.setSuccess('successfully registered'));
    } catch (error: any) {
      dispatch(notificationsAction.setError(error.message));
      dispatch(notificationsAction.setSuccess(''));
    }
  };
};
