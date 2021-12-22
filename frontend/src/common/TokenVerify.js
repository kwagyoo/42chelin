import { getCookie, setCookie } from './Cookie';
import jwt from 'jsonwebtoken';
import { fetchRefresh } from '../lib/api/auth';

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
        setTimeout(() => {
          try {
            console.log('hello');
            TokenVerify();
          } catch (err) {}
        }, 1000 * 60 * 15 + 1000);
      } catch (err) {
        throw new Error('refresh failed');
      }
      throw new Error('refresh');
    } else {
      throw new Error(err.message);
    }
  }
};

export default TokenVerify;
