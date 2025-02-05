import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: <boolean>false,
  isAdmin: <boolean>false,
  isCollapsed: <boolean>false,
  isLoading: false,
  sort: {
    isBlocked: undefined,
    search: undefined,
    offset: 0,
    sortBy: undefined,
    sortOrder: undefined,
  },
  notifications: {
    error: '',
    success: '',
  },
};

export const storeSlice = createSlice({
  name: 'store',
  initialState: initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    checkRole: (state, action) => {
      state.isAdmin = action.payload.roles.includes('ADMIN');
    },
    toggle: (state) => {
      state.isCollapsed = !state.isCollapsed;
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
    setError(state, action) {
      state.notifications.error = action.payload;
    },
    setSuccess(state, action) {
      state.notifications.success = action.payload;
    },
  },
});

export const storeAction = storeSlice.actions;
