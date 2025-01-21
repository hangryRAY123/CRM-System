import { ProfileForm } from '../components/Form/ProfileForm';
import { PasswordForm } from '../components/Form/PasswordForm';

export const Profile = () => {
  return (
    <div style={{ textAlign: 'left' }}>
      <ProfileForm />
      <PasswordForm />
    </div>
  );
};
