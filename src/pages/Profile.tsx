import { ProfileForm } from '../components/form/profileForm';
import { PasswordForm } from '../components/form/PasswordForm';

export const Profile = () => {
  return (
    <div style={{ textAlign: 'left' }}>
      <ProfileForm />
      <PasswordForm />
    </div>
  );
};
