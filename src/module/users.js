import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  isLogin: false,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.username = action.payload;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

const { reducer, actions } = userSlice;
export const { setUserName, setIsLogin } = actions;
export default reducer;
