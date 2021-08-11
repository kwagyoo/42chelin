import { createAction, handleActions } from 'redux-actions';

const GET_USER = 'user/GET_USER';

export const getuser = createAction(GET_USER);

const initialState = {
  name: '',
};

const user = handleActions(
  {
    [GET_USER]: (state, action) => ({ name: state.name }),
  },
  initialState,
);

export default user;
