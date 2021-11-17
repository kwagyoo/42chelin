import { combineReducers } from 'redux';
import users from './users';
import { posts, review } from './posts';

const reducer = combineReducers({
  users,
  posts,
  review,
});

export default reducer;
