import { Divider } from 'antd';
import { UserList } from '../components/User/UserList';

export const Users = () => {
  return (
    <>
      <Divider orientation='left'>Users</Divider>
      <section>
        <UserList />
      </section>
    </>
  );
};
