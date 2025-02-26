import { Divider } from 'antd';
import { ProfileForm } from '../components/Form/ProfileForm';

export const UserProfile = () => {
  return (
    <>
      <Divider orientation='left'>Profile</Divider>
      <section>
        <div style={{ textAlign: 'left' }}>
          <ProfileForm />
        </div>
      </section>
    </>
  );
};
