import { combineReducers } from 'redux';
import users from './users';
import posts from './posts';
import storeinfo from './storeinfo';

const reducer = combineReducers({
  users,
  posts,
  storeinfo,
});

export default reducer;
