import { NavLink } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { regUserData } from '../store/reg-actions';

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

export const Registration: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const error = useSelector((state: any) => state.error.error);

  const onFinish = (values: any) => {
    const user = {
      email: values.email,
      login: values.login,
      password: values.password,
      phoneNumber: values.phone,
      username: values.nickname,
    };
    dispatch(regUserData(user));
    console.log('Received values of form: ', values);
  };

  return (
    <div className='form-wrapper'>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
          rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='login'
          label='Login'
          tooltip='Login name for the application'
          rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
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
              message: 'The input is not valid E-mail!',
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
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
            Register
          </Button>
          <br />
          or <NavLink to='/auth'>Login now!</NavLink>
        </Form.Item>
      </Form>
    </div>
  );
};
