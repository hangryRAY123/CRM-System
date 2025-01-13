import { errorAction } from './error';
import { regUser } from '../api/https';
import { regAction } from './reg-slice';
import { UserRegistration } from '../helpers/types';

export const regUserData = (user: UserRegistration) => {
  return async (
    dispatch: (arg0: { payload: any; type: 'reg/setRegistrationData' | 'error/setError' }) => void
  ) => {
    try {
      await regUser(user);
      dispatch(regAction.setRegistrationData(user));
    } catch (error: any) {
      console.log(error);
      dispatch(errorAction.setError(error.message));
    }
  };
};
