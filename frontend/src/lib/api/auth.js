import client from './client';

export const getToken = (code) =>
  client.post('https://api.intra.42.fr/oauth/token', {
    grant_type: 'authorization_code',
    client_id: `'${process.env.REACT_APP_CLIENT_ID}'`,
    client_secret:
      'd49df9404304e2bff0365eaec854556af2ce711706f7498caed2d1d5cdd882b3',
    code: code,
    redirect_uri: 'http://localhost:3000/login',
  });

export const getUser = (token) =>
  client.get('https://api.intra.42.fr/v2/me', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

//   'c99cdf4885e7223c1e66e3060d56b9aac2dd5927b765593c669c78613a5b679d'
//   'd49df9404304e2bff0365eaec854556af2ce711706f7498caed2d1d5cdd882b3'
//   'http://localhost:3000/login'
