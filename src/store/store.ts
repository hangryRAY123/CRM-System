import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user/user-slice';
import { authSlice } from './auth/auth-slice';
import { notificationsSlice } from './notification/notifications-slice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    auth: authSlice.reducer,
    notifications: notificationsSlice.reducer,
  },
});

export default store;
