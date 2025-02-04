import { configureStore } from '@reduxjs/toolkit';
import { notificationsSlice } from './notification/notifications-slice';
import { authSlice } from './authorization/auth-slice';
import { profileSlice } from './profile/profile-slice';
import { userSlice } from './user/user-slice';

const store = configureStore({
  reducer: {
    notifications: notificationsSlice.reducer,
    auth: authSlice.reducer,
    profile: profileSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
