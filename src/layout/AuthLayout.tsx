import { LockOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <section className='auth'>
      <div className='lock'>
        <LockOutlined />
      </div>
      <Outlet />
    </section>
  );
};
