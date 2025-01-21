import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../helpers/types';

const userState = {
  data: [] as User[],
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    setUsers: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const userAction = userSlice.actions;
