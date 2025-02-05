import { ProfileForm } from '../components/Form/ProfileForm';
import { PasswordForm } from '../components/Form/PasswordForm';
import { Divider, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'antd';
import { ProfileRequest } from '../helpers/types';
import { storeAction } from '../store/store-slice';
import { getProfile, updateProfile } from '../api/profile';

export const Profile = () => {
  const [profile, setProfile] = useState<object>({});
  const [isEdit, setEdit] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const error = useSelector((state: any) => state.store.notifications.error);
  const dispatch: any = useDispatch();
  const [form] = Form.useForm();

  const handleEdit = () => {
    setEdit(!isEdit);
  };

  const onFinish = async (user: ProfileRequest) => {
    try {
      const profileData = await updateProfile(user);
      setProfile(profileData);
      setEdit(false);

      dispatch(storeAction.setError(''));
    } catch (error: any) {
      dispatch(
        storeAction.setError(
          error.response.data || 'Failed to fetch user data. Please try again later.'
        )
      );
    }
  };

  useEffect(() => {
    const getProfileData = async () => {
      try {
        setLoading(true);
        const profileData = await getProfile();
        setProfile(profileData);
        form.setFieldsValue({
          username: profileData.username,
          email: profileData.email,
          phoneNumber: profileData.phoneNumber,
        });
        setLoading(false);

        dispatch(storeAction.setError(''));
      } catch (error: any) {
        setLoading(false);
        dispatch(
          storeAction.setError(
            error.response.data || 'Failed to fetch profile. Please try again later.'
          )
        );
      }
    };
    getProfileData();
  }, []);

  return (
    <>
      <Divider orientation='left'>Profile</Divider>
      <section>
        {isLoading ? (
          <Spin size='large' />
        ) : (
          <div style={{ textAlign: 'left' }}>
            <ProfileForm
              error={error}
              form={form}
              isEdit={isEdit}
              profile={profile}
              onFinish={onFinish}
              handleEdit={handleEdit}
            />
            <PasswordForm />
          </div>
        )}
      </section>
    </>
  );
};
