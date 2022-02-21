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

export const reviewSlice = createSlice({
  name: 'review',
  initialState: {},
  reducers: {
    setReview: (state, action) => {
      state.review = action.payload || null;
    },
  },
});

export const menuSlice = createSlice({
  name: 'menus',
  initialState: {},
  reducers: {
    setMenu: (state, action) => {
      state.menus = action.payload || null;
    },
  },
});

const { reducer: posts, actions: postActions } = postSlice;
export const { getList } = postActions;

const { reducer: review, actions: reviewActions } = reviewSlice;
export const { setReview } = reviewActions;

const { reducer: menus, actions: menuActions } = menuSlice;
export const { setMenu } = menuActions;

export { posts, review, menus };
