import { getCookie, setCookie } from './Cookie';
import jwt from 'jsonwebtoken';
import { fetchRefresh } from '../lib/api/auth';
import client from '../lib/api/client';

const TokenVerify = async () => {
  const id = sessionStorage.getItem('clusterName');
  try {
    const accessToken = getCookie('accToken');
    if (!accessToken) return;
    jwt.verify(accessToken, process.env.REACT_APP_JWT_SECRET_KEY);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      try {
        const res = await fetchRefresh(id);
        const accToken = res.data.access_token;
        const refToken = res.data.refresh_token;
        const expires = new Date();
        if (localStorage.getItem('autoLogin') === 'true')
          expires.setDate(expires.getDate() + 7);
        else expires.setMinutes(expires.getMinutes() + 20);

        if (accToken) {
          setCookie('accToken', accToken, {
            path: '/',
            secure: true,
            sameSite: 'none',
            expires: expires,
          });
          client.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accToken}`;
          console.log('재발급');
        }
        if (refToken !== getCookie('refToken')) {
          setCookie('refToken', refToken, {
            path: '/',
            secure: true,
            sameSite: 'none',
            expires:
              localStorage.getItem('autoLogin') === 'true' ? expires : '',
          });
        }
        return Promise.resolve();
      } catch (err) {
        console.log(err);
        return Promise.reject('refresh failed');
      }
    } else {
      return Promise.reject(err.message);
    }
  }
};

export default TokenVerify;
