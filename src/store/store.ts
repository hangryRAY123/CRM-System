import { configureStore } from '@reduxjs/toolkit';
import { regSlice } from './registration/reg-slice';
import { notificationsSlice } from './notification/notifications-slice';
import { authSlice } from './authorization/auth-slice';
import { userSlice } from './user/user-slice';

const store = configureStore({
  reducer: {
    reg: regSlice.reducer,
    notifications: notificationsSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
