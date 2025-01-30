import { NavLink } from 'react-router-dom';
import { Button, Form, Input, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { regUserData } from '../../store/registration/reg-action';
import { useEffect } from 'react';
import { VALIDATE_AUTH } from '../../helpers/constants';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const RegForm: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch: any = useDispatch();
  const error = useSelector((state: any) => state.notifications.error);
  const success = useSelector((state: any) => state.notifications.success);
  const userLogin = useSelector((state: any) => state.reg.login);

  const onFinish = async (values: any) => {
    const user = {
      email: values.email,
      login: values.login,
      password: values.password,
      phoneNumber: values.phone,
      username: values.nickname,
    };

    dispatch(regUserData(user));
  };

  useEffect(() => {
    form.resetFields();
  }, [success]);

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
      {success && (
        <p style={{ color: 'green' }}>
          <span style={{ fontSize: 25, color: '#646cff' }}>{userLogin}</span>&nbsp;
          {success}. <NavLink to='/'>Login now!</NavLink>{' '}
        </p>
      )}
      <Form
        {...formItemLayout}
        form={form}
        name='register'
        onFinish={onFinish}
        initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
        scrollToFirstError
      >
        <Form.Item
          name='nickname'
          label='Nickname'
          tooltip='What do you want others to call you?'
          rules={[
            {
              required: true,
              message: 'Please input your nickname!',
            },
            {
              pattern: /^[a-zA-Zа-яА-ЯёЁ]+$/,
              message: 'Please enter only Russian or Latin alphabets',
            },
            {
              min: VALIDATE_AUTH.NAME.MIN,
              max: VALIDATE_AUTH.NAME.MAX,
              message: `Name must be between ${VALIDATE_AUTH.PASSWORD.MIN} and ${VALIDATE_AUTH.PASSWORD.MAX} characters`,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='login'
          label='Login'
          tooltip='Login name for the application'
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
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
          <Input />
        </Form.Item>

        <Form.Item
          name='password'
          label='Password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              min: VALIDATE_AUTH.PASSWORD.MIN,
              max: VALIDATE_AUTH.PASSWORD.MAX,
              message: `Password must be between ${VALIDATE_AUTH.PASSWORD.MIN} and ${VALIDATE_AUTH.PASSWORD.MAX} characters`,
            },
          ]}
          hasFeedback
        >
          <Input.Password autoComplete='off' />
        </Form.Item>

        <Form.Item
          name='confirm'
          label='Confirm Password'
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password autoComplete='off' />
        </Form.Item>

        <Form.Item
          name='email'
          label='E-mail'
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail! (email@mail.com)',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='phone'
          label='Phone Number'
          rules={[
            {
              pattern: /^(\+\d{1,3}[- ]?)?\d{10}$/,
              message: 'Please enter a valid phone number! (+1111111111)',
            },
          ]}
        >
          <Input style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
            Register
          </Button>
          <br />
          or <NavLink to='/'>Login now!</NavLink>
        </Form.Item>
      </Form>
    </div>
  );
};
