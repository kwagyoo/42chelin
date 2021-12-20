import { getCookie, setCookie } from './Cookie';
import jwt from 'jsonwebtoken';
import { fetchRefresh } from '../lib/api/auth';

const TokenVerify = async () => {
  const id = sessionStorage.getItem('clusterName');
  return new Promise((resolve, reject) => {
    const accessToken = getCookie('accToken');
    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.REACT_APP_JWT_SECRET_KEY,
      );
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        // try {
        //   const res = await fetchRefresh(id);
        //   const accToken = res.data.access_token;
        //   if (accToken) {
        //     setCookie('accToken', accToken, {
        //       path: '/',
        //       secure: true,
        //       sameSite: 'none',
        //     });
        //     console.log('재발급');
        //   }
        reject('refresh');
      } else {
        reject('error occured');
      }
    }
  });
};

export const checkTokenVerify = async () => {
  try {
    await TokenVerify();
  } catch (err) {
    console.error(err);
  }
};

export default TokenVerify;
