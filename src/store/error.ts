import { createSlice } from '@reduxjs/toolkit';

export const errorSlice = createSlice({
  name: 'error',
  initialState: {
    error: '',
  },
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const errorAction = errorSlice.actions;
