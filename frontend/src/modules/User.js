import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
};

export const getuserSlice = createSlice({
  name: 'getUserName',
  initialState,
  reducers: {
    getuser: (action) => ({ name: action.payload }),
  },
});

export const getUserName = getuserSlice.actions;
export default getuserSlice.reducer;
