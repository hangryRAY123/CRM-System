import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../helpers/types';

const userState = {
  data: [] as User[],
  total: 0,
  userProfile: <User>{
    date: '',
    email: '',
    id: 0,
    roles: [],
    isBlocked: false,
    phoneNumber: '',
    username: '',
  },
  isLoading: false,
  sort: {
    isBlocked: undefined,
    search: undefined,
    offset: 0,
    sortBy: undefined,
    sortOrder: undefined,
  },
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
    setBlocked: (state, action) => {
      state.sort.isBlocked = action.payload;
    },
    setSearch: (state, action) => {
      state.sort.search = action.payload;
    },
    setPaginationCurrent: (state, action) => {
      state.sort.offset = action.payload;
    },
    setSortField: (state, action) => {
      state.sort.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sort.sortOrder = action.payload;
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
    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
});

export const userAction = userSlice.actions;
