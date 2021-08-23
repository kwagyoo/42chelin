import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUserName: (state, action) => {
      state.name = action.payload;
    },
  },
});

const { reducer, actions } = userSlice;
export const { getUserName } = actions;
export default reducer;
