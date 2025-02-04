import { ProfileForm } from '../components/Form/ProfileForm';
import { PasswordForm } from '../components/Form/PasswordForm';
import { Divider } from 'antd';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'antd';
import { ProfileRequest } from '../helpers/types';
import { profileAction } from '../store/profile/profile-slice';
import { updateProfileData } from '../store/profile/profile-action';

export const Profile = () => {
  const profile = useSelector((state: any) => state.profile.data);
  const isEdit = useSelector((state: any) => state.profile.isEdit);
  const error = useSelector((state: any) => state.notifications.error);
  const dispatch: any = useDispatch();
  const [form] = Form.useForm();

  const handleEdit = () => {
    dispatch(profileAction.setIsEdit());
  };

  const onFinish = async (values: ProfileRequest) => {
    dispatch(updateProfileData(values));
  };

  useEffect(() => {
    form.setFieldsValue({
      username: profile.username,
      email: profile.email,
      phoneNumber: profile.phoneNumber,
    });
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
          <PasswordForm />
        </div>
      </section>
    </>
  );
};
