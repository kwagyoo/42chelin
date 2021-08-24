import { configureStore } from '@reduxjs/toolkit';
import User from './User';

export default configureStore({
  reducer: {
    User,
  },
});
