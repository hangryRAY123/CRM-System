import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../helpers/types';

export const userState = {
  data: <User>{
    date: '',
    email: '',
    id: 0,
    isAdmin: false,
    isBlocked: false,
    phoneNumber: '',
    username: '',
  },
  isEdit: <boolean>false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    setUser: (state, action) => {
      state.data.date = action.payload.date;
      state.data.email = action.payload.email;
      state.data.id = action.payload.id;
      state.data.isAdmin = action.payload.isAdmin;
      state.data.isBlocked = action.payload.isBlocked;
      state.data.phoneNumber = action.payload.phoneNumber;
      state.data.username = action.payload.username;
    },
    setIsEdit: (state) => {
      state.isEdit = !state.isEdit;
    },
  },
});

export const userAction = userSlice.actions;
