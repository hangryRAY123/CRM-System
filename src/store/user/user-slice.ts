import { createSlice } from '@reduxjs/toolkit';
import { Sort } from '../../helpers/types';

const userState = {
  isLoading: <boolean>false,
  sort: <Sort>{
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
  },
});

export const userAction = userSlice.actions;
