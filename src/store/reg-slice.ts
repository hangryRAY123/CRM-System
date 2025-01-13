import { createSlice } from '@reduxjs/toolkit';
import { UserRegistration } from '../helpers/types';

const initialState: UserRegistration = {
  email: '',
  login: '',
  password: '',
  phoneNumber: '',
  username: '',
};

export const regSlice = createSlice({
  name: 'reg',
  initialState,
  reducers: {
    setRegistrationData: (state, action) => {
      state.email = action.payload.email;
      state.login = action.payload.login;
      state.password = action.payload.password;
      state.phoneNumber = action.payload.phoneNumber;
      state.username = action.payload.username;
    },
  },
});

export const regAction = regSlice.actions;
