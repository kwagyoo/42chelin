import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  storeList: [],
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getList: (state, action) => {
      state.storeList = action.payload;
    },
  },
});

const { reducer, actions } = postSlice;
export const { getList } = actions;
export default reducer;
