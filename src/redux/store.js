import { configureStore } from '@reduxjs/toolkit';
import locationsReducer from './locationsSlice';
import testReducer from './testSlice';

export const store = configureStore({
  reducer: {
    locations: locationsReducer,
    test: testReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store; 