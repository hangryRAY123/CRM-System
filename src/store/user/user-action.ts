import { getUsers } from '../../api/https';
import { userAction } from './user-slice';

export const getUsersData = (token: string) => {
  return async (dispatch: (arg0: { payload: any; type: 'user/setUsers' }) => void) => {
    try {
      const res = await getUsers(token);
      dispatch(userAction.setUsers(res.data));
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch users data. Please try again later.');
    }
  };
};
