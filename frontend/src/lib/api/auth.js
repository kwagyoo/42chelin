import client from './client';

export const login = (code) =>
  client.post(
    `https://d2d5oodqrc.execute-api.ap-northeast-2.amazonaws.com/Stage/requestlogintoken/`,
    {
      code: code,
    },
  );

export const getToken = (code) => {
  const data = {
    grant_type: 'authorization_code',
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.REACT_APP_CLIENT_SERECT,
  };

  fetch(`https://api.intra.42.fr/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    code: code,
    data: JSON.stringify(data),
    redirect_uri: `${process.env.REACT_APP_REDIECT_URL}`,
  });
};

export const getUser = (token) =>
  client.get(`${process.env.REACT_APP_INTRA}v2/me`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
