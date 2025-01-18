import React from 'react';
import { LockOutlined } from '@ant-design/icons';
import { AuthForm } from '../components/form/AuthForm';

export const Authorization: React.FC = () => {
  return (
    <section className='auth'>
      <div className='lock'>
        <LockOutlined />
      </div>
      <AuthForm />
    </section>
  );
};
