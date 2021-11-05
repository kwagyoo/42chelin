import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  storeList: [],
};

// storelist 가 undefind일 경우 빈배열을 넣어주는 방어코드
export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getList: (state, action) => {
      state.storeList = action.payload || [];
    },
  },
});

const { reducer, actions } = postSlice;
export const { getList } = actions;
export default reducer;
