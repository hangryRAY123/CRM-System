import { configureStore } from '@reduxjs/toolkit';
import { regSlice } from './reg-slice';
import { errorSlice } from './error';

const store = configureStore({
  reducer: {
    reg: regSlice.reducer,
    error: errorSlice.reducer,
  },
});

export default store;
