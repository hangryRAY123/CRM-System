import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../helpers/types';

const userState = {
  data: [] as User[],
  userProfile: <User>{
    date: '',
    email: '',
    id: 0,
    roles: [],
    isBlocked: false,
    phoneNumber: '',
    username: '',
  },
  isLoading: <boolean>false,
  sort: <string>'',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    setUsers: (state, action) => {
      state.data = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile.date = action.payload.date;
      state.userProfile.email = action.payload.email;
      state.userProfile.id = action.payload.id;
      state.userProfile.roles = action.payload.roles;
      state.userProfile.isBlocked = action.payload.isBlocked;
      state.userProfile.phoneNumber = action.payload.phoneNumber;
      state.userProfile.username = action.payload.username;
    },
  },
});

export const userAction = userSlice.actions;
