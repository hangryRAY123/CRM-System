import { Divider, Spin, List, Alert } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notificationsAction } from '../store/notification/notifications-slice';
import { getProfile } from '../api/profile';
import { User } from '../helpers/types';

export const Profile = () => {
  const [profile, setProfile] = useState<User>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const error = useSelector((state: any) => state.notifications.error);
  const dispatch: any = useDispatch();

  useEffect(() => {
    const getProfileData = async () => {
      try {
        setLoading(true);
        const profileData = await getProfile();
        setProfile(profileData);
        setLoading(false);

        dispatch(notificationsAction.setError(''));
      } catch (error: any) {
        setLoading(false);
        dispatch(
          notificationsAction.setError(
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
        {error && (
          <Alert
            style={{ width: 'fit-content', marginBottom: 15 }}
            message={error}
            type='error'
            showIcon
            closable
          />
        )}
        {isLoading ? (
          <Spin size='large' />
        ) : (
          <List itemLayout='horizontal' style={{ textAlign: 'left' }}>
            <List.Item.Meta
              className='profile-item'
              title='Nickname:'
              description={profile?.username}
            />
            <List.Item.Meta className='profile-item' title='E-mail:' description={profile?.email} />
            <List.Item.Meta
              className='profile-item'
              title='Phone Number:'
              description={profile?.phoneNumber || 'no phone'}
            />
          </List>
        )}
      </section>
    </>
  );
};
