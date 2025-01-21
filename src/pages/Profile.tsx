import { ProfileForm } from '../components/Form/ProfileForm';
import { PasswordForm } from '../components/Form/PasswordForm';
import { Divider } from 'antd';

export const Profile = () => {
  return (
    <>
      <Divider orientation='left'>Profile</Divider>
      <section>
        <div style={{ textAlign: 'left' }}>
          <ProfileForm />
          <PasswordForm />
        </div>
      </section>
    </>
  );
};
