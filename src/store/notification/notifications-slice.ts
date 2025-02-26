import { createSlice } from '@reduxjs/toolkit';

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    error: <string>'',
    success: <string>'',
  },
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    setSuccess(state, action) {
      state.success = action.payload;
    },
  },
});

export const notificationsAction = notificationsSlice.actions;
