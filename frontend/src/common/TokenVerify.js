import { getCookie, setCookie } from './Cookie';
import jwt from 'jsonwebtoken';
import { fetchRefresh } from '../lib/api/auth';

const TokenVerify = async () => {
  const id = sessionStorage.getItem('clusterName');
  return new Promise((resolve, reject) => {
    const accessToken = getCookie('accToken');
    jwt.verify(
      accessToken,
      process.env.REACT_APP_JWT_SECRET_KEY,
      async (err) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            const res = await fetchRefresh(id);
            const accToken = res.data.access_token;
            const refToken = res.data.refresh_token;
            if (accToken) {
              setCookie('accToken', accToken, {
                path: '/',
                secure: true,
                sameSite: 'none',
              });
              console.log('재발급');
            }
            if (refToken !== getCookie('refToken')) {
              setCookie('refToken', refToken, {
                path: '/',
                secure: true,
                sameSite: 'none',
              });
            }
            reject('refresh');
          } else {
            reject('error occured');
          }
        }
      },
    );
    resolve();
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
