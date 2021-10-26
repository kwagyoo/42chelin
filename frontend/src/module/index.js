import { combineReducers } from 'redux';
import users from './users';
import posts from './posts';

const reducer = combineReducers({
  users,
  posts,
});

export default reducer;
