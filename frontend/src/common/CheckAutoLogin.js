import { getCookie } from './Cookie';
import jwt from 'jsonwebtoken';

const checkAutoLogin = () => {
  const refToken = getCookie('refToken');
  if (refToken) {
    let todaysDate = new Date();
    let decoded = jwt.verify(refToken, process.env.secret_key);
  }
  //access token 가져와서 decode해서
  //sessionStrage에 username을 넣어야함
};
