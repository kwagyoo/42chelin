import client from './client';

export const login = (code) =>
  client.post(
    `https://d2d5oodqrc.execute-api.ap-northeast-2.amazonaws.com/Stage/requestlogintoken/`,
    {
      code: code,
    },
  );

export const getToken = (code) =>
  client.post(`${process.env.REACT_APP_INTRA}oauth/token`, {
    grant_type: 'authorization_code',
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.REACT_APP_CLIENT_SERECT,
    code: code,
    redirect_uri: `${process.env.REACT_APP_REDIECT_URL}`,
  });

export const getUser = (token) =>
  client.get(`${process.env.REACT_APP_INTRA}v2/me`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
