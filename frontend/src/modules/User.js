import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
};

export const getuserSlice = createSlice({
  name: 'getuser',
  initialState,
  reducers: {
    getuser: (action) => ({ name: action.payload }),
  },
});

export const getuser = getuserSlice.actions;
export default getuserSlice.reducer;

// const GET_USER = 'user/GET_USER';

// export const getuser = createAction(GET_USER);

// const user = handleActions(
//   {
//     [GET_USER]: (state, action) => ({ name: action.payload }),
//   },
//   initialState,
// );

// export default user;
