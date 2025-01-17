import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserData } from '../store/user/user-action';
import React from 'react';
import { Button, Form, Input, Divider } from 'antd';
import { VALIDATE_AUTH } from '../helpers/constants';
import { CheckCircleOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';
import { ProfileRequest } from '../helpers/types';
import { userAction } from '../store/user/user-slice';
import { updateUserData } from '../store/user/user-action';

export const Profile: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  const isEdit = useSelector((state: any) => state.user.isEdit);
  const error = useSelector((state: any) => state.notifications.error);
  const dispatch: any = useDispatch();
  const token = localStorage.getItem('accessToken');
  const [form] = Form.useForm();

  useEffect(() => {
    if (token) {
      dispatch(getUserData(token));
    }
    form.setFieldsValue({
      username: user.data.username,
      email: user.data.email,
      phoneNumber: user.data.phoneNumber,
    });
  }, [user, dispatch, form]);

  const handleEdit = () => {
    dispatch(userAction.setIsEdit());
  };

  const onFinish = async (values: ProfileRequest) => {
    if (token) {
      dispatch(updateUserData(values, token));
    }
  };

  return (
    <>
      {error && <h2 style={{ color: 'red' }}>{error}</h2>}
      <Divider orientation='left'>Profile</Divider>
      <Form
        style={{ width: 'fit-content', display: 'flex', flexDirection: 'column', gap: 20 }}
        name='profile'
        form={form}
        onFinish={onFinish}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Form.Item
            style={{ marginBottom: 0 }}
            name='username'
            label='Nickname'
            tooltip='What do you want others to call you?'
            rules={[
              {
                required: true,
                message: 'Please input your nickname!',
              },
              {
                min: VALIDATE_AUTH.NAME.MIN,
                max: VALIDATE_AUTH.NAME.MAX,
                message: `Name must be between ${VALIDATE_AUTH.PASSWORD.MIN} and ${VALIDATE_AUTH.PASSWORD.MAX} characters`,
              },
            ]}
          >
            {isEdit && <Input />}
          </Form.Item>
          {!isEdit && <h3 style={{ margin: 0 }}>{user.data.username}</h3>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Form.Item
            style={{ marginBottom: 0 }}
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
            {isEdit && <Input />}
          </Form.Item>
          {!isEdit && <h3 style={{ margin: 0 }}>{user.data.email}</h3>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Form.Item
            style={{ marginBottom: 0 }}
            name='phoneNumber'
            label='Phone Number'
            rules={[
              {
                pattern: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                message: 'Please enter a valid phone number! (+1111111111)',
              },
            ]}
          >
            {isEdit && <Input />}
          </Form.Item>
          {!isEdit && <h3 style={{ margin: 0 }}>{user.data.phoneNumber}</h3>}
        </div>
        <div className='btn-wrapper'>
          {isEdit && (
            <Form.Item>
              <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
                <CheckCircleOutlined />
                Save
              </Button>
              <Button
                type='primary'
                htmlType='button'
                onClick={handleEdit}
                style={{ width: '100%' }}
              >
                <CloseOutlined />
                Cansel
              </Button>
            </Form.Item>
          )}
          {!isEdit && (
            <Button type='primary' htmlType='button' onClick={handleEdit} style={{ width: '100%' }}>
              <EditOutlined />
              Edit profile
            </Button>
          )}
        </div>
      </Form>
    </>
  );
};
