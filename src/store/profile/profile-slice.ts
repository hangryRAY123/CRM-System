import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../helpers/types';

export const profileState = {
  data: <User>{
    date: '',
    email: '',
    id: 0,
    roles: [],
    isBlocked: false,
    phoneNumber: '',
    username: '',
  },
  isEdit: <boolean>false,
  isAdmin: <boolean>false,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState: profileState,
  reducers: {
    setProfile: (state, action) => {
      state.data.date = action.payload.date;
      state.data.email = action.payload.email;
      state.data.id = action.payload.id;
      state.data.roles = action.payload.roles;
      state.data.isBlocked = action.payload.isBlocked;
      state.data.phoneNumber = action.payload.phoneNumber;
      state.data.username = action.payload.username;
    },
    setIsEdit: (state) => {
      state.isEdit = !state.isEdit;
    },
    checkRole: (state, action) => {
      state.isAdmin = state.data.roles.includes(action.payload);
    },
  },
});

export const profileAction = profileSlice.actions;
