import React from 'react';
import { useState, useEffect } from 'react';
import { LockOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, Alert } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authUserData } from '../../store/authorization/auth-action';
import { authAction } from '../../store/authorization/auth-slice';
import { AuthData } from '../../helpers/types';
import { VALIDATE_AUTH } from '../../helpers/constants';

export const AuthForm: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch: any = useDispatch();
  const error = useSelector((state: any) => state.notifications.error);
  const user = useSelector((state: any) => state.auth.data);
  const isAuth = useSelector((state: any) => state.auth.isAuth);
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onFinish = async (values: AuthData) => {
    setLoading(true);
    dispatch(authAction.setAuthData(values));
  };

  useEffect(() => {
    if (user.login) {
      dispatch(authUserData(user));
    }
    if (error) {
      setLoading(false);
    }
    if (isAuth) {
      setLoading(false);
      navigate('/todolist');
    }
  }, [user, dispatch, error, isAuth]);

  return (
    <div className='form-wrapper'>
      {error && (
        <Alert
          style={{ width: 'fit-content', marginLeft: 'auto', marginBottom: 15 }}
          message={error}
          type='error'
          showIcon
          closable
        />
      )}
      {isLoading && (
        <p style={{ color: '#1677ff' }}>
          <LoadingOutlined />
        </p>
      )}
      <Form form={form} name='login' initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          name='login'
          rules={[
            { required: true, message: 'Please input your Login!' },
            {
              pattern: /^[a-zA-Z]+$/,
              message: `Login must contain only Latin characters!`,
            },
            {
              min: VALIDATE_AUTH.LOGIN.MIN,
              max: VALIDATE_AUTH.LOGIN.MAX,
              message: `Login must be between ${VALIDATE_AUTH.LOGIN.MIN} and ${VALIDATE_AUTH.LOGIN.MAX} characters`,
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder='Login' />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            { required: true, message: 'Please input your Password!' },
            {
              min: VALIDATE_AUTH.PASSWORD.MIN,
              max: VALIDATE_AUTH.PASSWORD.MAX,
              message: `Password must be between ${VALIDATE_AUTH.PASSWORD.MIN} and ${VALIDATE_AUTH.PASSWORD.MAX} characters`,
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type='password'
            placeholder='Password'
            autoComplete='off'
          />
        </Form.Item>

        <Form.Item>
          <NavLink to='/'>Forgot password</NavLink>
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
