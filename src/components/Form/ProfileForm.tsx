import React from 'react';
import { Button, Form, Input, Alert, Spin } from 'antd';
import { VALIDATE_AUTH } from '../../helpers/constants';
import { CheckCircleOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProfileRequest, User, State } from '../../helpers/types';
import { useParams } from 'react-router-dom';
import { notificationsAction } from '../../store/notification/notifications-slice';
import { getUserProfile, updateUserProfile } from '../../api/users';
import { AxiosError } from 'axios';

export const ProfileForm: React.FC = () => {
  const [profile, setProfile] = useState({} as User);
  const [fields, setFields] = useState({} as ProfileRequest);
  const [isEdit, setEdit] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const error = useSelector((state: State) => state.notifications.error);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id } = useParams();

  const handleEdit = () => {
    setEdit(!isEdit);
    form.setFieldsValue({
      username: profile?.username,
      email: profile?.email,
      phoneNumber: profile?.phoneNumber,
    });
  };

  const onValuesChange = (value: ProfileRequest) => {
    setFields((prevFields: ProfileRequest) => ({
      ...prevFields,
      ...value,
    }));
  };

  const onFinish = async () => {
    try {
      const profileData = await updateUserProfile(Number(id), fields);
      setProfile(profileData);
      setEdit(false);
      setFields({} as ProfileRequest);

      dispatch(notificationsAction.setError(''));
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(
          notificationsAction.setError(
            error.response?.data || 'Failed to get user profile. Please try again later.'
          )
        );
      }
    }
  };

  useEffect(() => {
    const getUserProfileData = async () => {
      try {
        setLoading(true);
        const profileData = await getUserProfile(Number(id));
        setProfile(profileData);
        form.setFieldsValue({
          username: profileData.username,
          email: profileData.email,
          phoneNumber: profileData.phoneNumber,
        });

        setLoading(false);
        dispatch(notificationsAction.setError(''));
      } catch (error) {
        if (error instanceof AxiosError) {
          setLoading(false);
          dispatch(
            notificationsAction.setError(
              error.response?.data || 'Failed to get user profile. Please try again later.'
            )
          );
        }
      }
    };
    getUserProfileData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Spin size='large' />
      ) : (
        <>
          {error && (
            <Alert
              style={{ width: 'fit-content', marginBottom: 15 }}
              message={error}
              type='error'
              showIcon
              closable
            />
          )}
          <Form
            className='profile-form'
            style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}
            name='profile'
            form={form}
            onFinish={onFinish}
            onValuesChange={onValuesChange}
          >
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
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
                <Input readOnly={!isEdit} />
              </Form.Item>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
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
                <Input readOnly={!isEdit} />
              </Form.Item>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='phoneNumber'
                label='Phone Number'
                rules={[
                  {
                    pattern: /^(\+\d{1}[- ]?)?\d{10}$/,
                    message: 'Please enter a valid phone number! (+1111111111)',
                  },
                ]}
              >
                <Input readOnly={!isEdit} />
              </Form.Item>
            </div>
            <div className='btn-wrapper'>
              {isEdit && (
                <Form.Item>
                  <Button type='primary' htmlType='submit' style={{ width: 'fit-content' }}>
                    <CheckCircleOutlined />
                    Save
                  </Button>
                  <Button
                    type='primary'
                    htmlType='button'
                    onClick={handleEdit}
                    style={{ width: 'fit-content' }}
                  >
                    <CloseOutlined />
                    Cansel
                  </Button>
                </Form.Item>
              )}
              {!isEdit && (
                <Button
                  type='primary'
                  htmlType='button'
                  onClick={handleEdit}
                  style={{ width: 'fit-content' }}
                >
                  <EditOutlined />
                  Edit profile
                </Button>
              )}
            </div>
          </Form>
        </>
      )}
    </>
  );
};
