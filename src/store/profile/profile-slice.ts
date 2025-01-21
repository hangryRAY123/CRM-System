import { createSlice } from '@reduxjs/toolkit';
import { Profile } from '../../helpers/types';

export const profileState = {
  data: <Profile>{
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

export const profileSlice = createSlice({
  name: 'profile',
  initialState: profileState,
  reducers: {
    setProfile: (state, action) => {
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

export const profileAction = profileSlice.actions;
