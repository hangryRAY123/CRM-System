import { Divider } from 'antd';
import { UserList } from '../components/User/UserList';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeAction } from '../store/store-slice';

export const Users = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state: any) => state.store.isAdmin);

  useEffect(() => {
    return () => {
      dispatch(storeAction.setBlocked(undefined));
      dispatch(storeAction.setSortField(undefined));
      dispatch(storeAction.setSortOrder(undefined));
      dispatch(storeAction.setSearch(undefined));
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
