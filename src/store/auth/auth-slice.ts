import { createSlice } from '@reduxjs/toolkit';

export const authState = {
  isAuth: <boolean>false,
  isAdmin: <boolean>false,
  isCollapsed: <boolean>false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    checkRole: (state, action) => {
      state.isAdmin = action.payload.roles.includes('ADMIN');
    },
    toggle: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
  },
});

export const authAction = authSlice.actions;
