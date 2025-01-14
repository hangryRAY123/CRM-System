import React from 'react';
import { useState } from 'react';
import { LockOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authUserData } from '../store/authorization/auth-action';

export const Authorization: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch: any = useDispatch();
  const error = useSelector((state: any) => state.notifications.error);
  const [isLoading, setLoading] = useState<boolean>(false);
  // const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      await dispatch(authUserData(values));
      setLoading(false);
      // navigate('/todolist');
    } catch (error: any) {
      throw new Error('Failed to log in. Please check your login or password.');
    }
  };

  return (
    <div className='form-wrapper'>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {isLoading && (
        <p style={{ color: '#1677ff' }}>
          <LoadingOutlined />
        </p>
      )}
      <Form form={form} name='login' initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item name='login' rules={[{ required: true, message: 'Please input your Login!' }]}>
          <Input prefix={<UserOutlined />} placeholder='Login' />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type='password'
            placeholder='Password'
            autoComplete='off'
          />
        </Form.Item>

        <Form.Item>
          <Button block type='primary' htmlType='submit'>
            Log in
          </Button>
          or <NavLink to='/reg'>Register now!</NavLink>
        </Form.Item>
      </Form>
    </div>
  );
};
