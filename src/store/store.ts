import { configureStore } from '@reduxjs/toolkit';
import { regSlice } from './registration/reg-slice';
import { notificationsSlice } from './notification/notifications';
import { authSlice } from './authorization/auth-slice';

const store = configureStore({
  reducer: {
    reg: regSlice.reducer,
    notifications: notificationsSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
