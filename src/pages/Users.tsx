import { Divider } from 'antd';
import { UserList } from '../components/User/UserList';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userAction } from '../store/user/user-slice';

export const Users = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(userAction.setSorting(''));
      dispatch(userAction.setSearch(''));
      dispatch(userAction.setFilter(''));
    };
  }, []);
  return (
    <>
      <Divider orientation='left'>Users</Divider>
      <section>
        <UserList />
      </section>
    </>
  );
};
