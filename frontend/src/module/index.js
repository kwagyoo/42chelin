import { combineReducers } from 'redux';
import users from './users';
import { posts, review, menus } from './posts';
import { persistReducer } from 'redux-persist'; // 추가
import storageSession from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'root',
  storage: storageSession,
};
const rootReducer = combineReducers({
  users,
  posts,
  review,
  menus,
});

export default persistReducer(persistConfig, rootReducer); // 수정
