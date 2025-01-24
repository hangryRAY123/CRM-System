import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../helpers/types';

const userState = {
  data: [] as User[],
  isLoading: false,
  isBlocked: '',
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
    setIsBlocked: (state, action) => {
      state.isBlocked = action.payload;
    },
  },
});

export const userAction = userSlice.actions;
