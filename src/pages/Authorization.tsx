import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { NavLink } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { regAction } from '../store/reg-slice';

export const Authorization: React.FC = () => {
  // const dispatch = useDispatch();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form name='login' initialValues={{ remember: true }} onFinish={onFinish}>
      <Form.Item name='login' rules={[{ required: true, message: 'Please input your Username!' }]}>
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
  );
};
