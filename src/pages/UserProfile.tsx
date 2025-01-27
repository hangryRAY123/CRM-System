import { UserProfileForm } from '../components/Form/UserProfileForm';
import { Divider } from 'antd';

export const UserProfile = () => {
  return (
    <>
      <Divider orientation='left'>Profile</Divider>
      <section>
        <div style={{ textAlign: 'left' }}>
          <UserProfileForm />
        </div>
      </section>
    </>
  );
};
