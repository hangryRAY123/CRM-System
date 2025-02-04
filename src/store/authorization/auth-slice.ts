import { createSlice } from '@reduxjs/toolkit';

export const authState = {
  isAuth: <boolean>false,
  isCollapsed: <boolean>false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    toggle: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
  },
});

export const authAction = authSlice.actions;
