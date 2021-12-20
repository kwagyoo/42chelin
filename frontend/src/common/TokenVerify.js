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
      async (err, decode) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            try {
              const res = await fetchRefresh(id);
              const accToken = res.data.access_token;
              if (accToken) {
                setCookie('accToken', accToken, {
                  path: '/',
                  secure: true,
                  sameSite: 'none',
                });
              }
            } catch (e) {
              console.log('catch e', e.response.statusCode);
              reject('error occured');
            }
          } else {
            reject('error occured');
          }
        } else {
          console.log(decode);
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
