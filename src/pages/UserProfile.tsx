import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'antd';
import { ProfileRequest } from '../helpers/types';
import { useParams } from 'react-router-dom';
import { Divider, Spin } from 'antd';
import { ProfileForm } from '../components/Form/ProfileForm';
import { storeAction } from '../store/store-slice';
import { getUserProfile, updateUserProfile } from '../api/users';

export const UserProfile = () => {
  const [profile, setProfile] = useState<object>({});
  const [isEdit, setEdit] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const error = useSelector((state: any) => state.store.notifications.error);
  const dispatch: any = useDispatch();
  const [form] = Form.useForm();
  const { id } = useParams();

  const handleEdit = () => {
    setEdit(!isEdit);
  };

  const onFinish = async (user: ProfileRequest) => {
    try {
      const profileData = await updateUserProfile(Number(id), user);
      setProfile(profileData);
      setEdit(false);

      dispatch(storeAction.setError(''));
    } catch (error: any) {
      dispatch(
        storeAction.setError(
          error.response.data || 'Failed to get user profile. Please try again later.'
        )
      );
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

        dispatch(storeAction.setError(''));
      } catch (error: any) {
        setLoading(false);
        dispatch(
          storeAction.setError(
            error.response.data || 'Failed to get user profile. Please try again later.'
          )
        );
      }
    };
    getUserProfileData();
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
          </div>
        )}
      </section>
    </>
  );
};
