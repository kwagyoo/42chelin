import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  access_token: '',
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUserName: (state, action) => {
      state.name = action.payload;
    },
    setAccessToken: (state) => {
      const local = localStorage.getItem('token');
      if (local) state.access_token = local;
    },
  },
});

const { reducer, actions } = userSlice;
export const { getUserName, setAccessToken } = actions;
export default reducer;
