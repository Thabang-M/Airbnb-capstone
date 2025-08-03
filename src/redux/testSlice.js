import { createSlice } from '@reduxjs/toolkit';

const testSlice = createSlice({
  name: 'test',
  initialState: {
    value: 0,
    message: 'Hello from Redux!'
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    }
  }
});

export const { increment, setMessage } = testSlice.actions;
export default testSlice.reducer; 