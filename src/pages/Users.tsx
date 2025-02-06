import { Divider } from 'antd';
import { UserList } from '../components/User/UserList';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../store/user/user-slice';

export const Users = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state: any) => state.auth.isAdmin);

  useEffect(() => {
    return () => {
      dispatch(userAction.setBlocked(undefined));
      dispatch(userAction.setSortField(undefined));
      dispatch(userAction.setSortOrder(undefined));
      dispatch(userAction.setSearch(undefined));
    };
  }, []);
  return (
    isAdmin && (
      <>
        <Divider orientation='left'>Users</Divider>
        <section>
          <UserList />
        </section>
      </>
    )
  );
};
