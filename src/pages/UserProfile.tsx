import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'antd';
import { ProfileRequest } from '../helpers/types';
import { profileAction } from '../store/profile/profile-slice';
import { updateUserProfileData } from '../store/user/user-action';
import { getUserProfileData } from '../store/user/user-action';
import { useParams } from 'react-router-dom';
import { Divider } from 'antd';
import { ProfileForm } from '../components/Form/ProfileForm';

export const UserProfile = () => {
  const profile = useSelector((state: any) => state.user.userProfile);
  const isEdit = useSelector((state: any) => state.profile.isEdit);
  const error = useSelector((state: any) => state.notifications.error);
  const dispatch: any = useDispatch();
  const [form] = Form.useForm();
  const { id } = useParams();

  const handleEdit = () => {
    dispatch(profileAction.setIsEdit());
  };

  const onFinish = async (values: ProfileRequest) => {
    dispatch(updateUserProfileData(Number(id), values));
  };

  useEffect(() => {
    form.setFieldsValue({
      username: profile.username,
      email: profile.email,
      phoneNumber: profile.phoneNumber,
    });

    dispatch(getUserProfileData(Number(id)));
  }, [profile.username]);
  return (
    <>
      <Divider orientation='left'>Profile</Divider>
      <section>
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
      </section>
    </>
  );
};
