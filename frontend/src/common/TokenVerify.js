import { getCookie, setCookie } from './Cookie';
import jwt from 'jsonwebtoken';
import { fetchRefresh } from '../lib/api/auth';

const TokenVerify = async () => {
  const id = 'hyunyoo';
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
              // status 200이 아니면, alert 띄우고 홈으로 이동
              //   history.go('/');
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

export default TokenVerify;
