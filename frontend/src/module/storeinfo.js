import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchstoreList: [],
};

// storelist 가 undefind일 경우 빈배열을 넣어주는 방어코드
export const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    getStoreList: (state, action) => {
      state.searchstoreList = action.payload || [];
    },
  },
});

const { reducer, actions } = storeSlice;
export const { getStoreList } = actions;
export default reducer;
