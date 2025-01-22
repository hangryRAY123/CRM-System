import { Divider } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUsersData } from '../store/user/user-action';
import TokenManager from '../helpers/token-manager';
import { UserList } from '../components/User/UserList';
export const Users = () => {
  const dispatch: any = useDispatch();
  const token = TokenManager.getToken();

  useEffect(() => {
    if (token) {
      dispatch(getUsersData(token));
    }
  }, [dispatch]);
  return (
    <>
      <Divider orientation='left'>Users</Divider>
      <section>
        <UserList />
      </section>
    </>
  );
};
