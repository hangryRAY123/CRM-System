import { createSlice } from '@reduxjs/toolkit';
import { AuthData } from '../../helpers/types';

const initialState = {
  data: <AuthData>{
    login: '',
    password: '',
  },
  isAuth: <boolean>false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.data.login = action.payload.login;
      state.data.password = action.payload.password;
    },
    resetAuthData: (state) => {
      state.data.login = '';
      state.data.password = '';
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
});

export const authAction = authSlice.actions;
