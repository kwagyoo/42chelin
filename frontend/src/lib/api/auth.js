import client from './client';

export const getToken = (code) =>
  client.post(
    `${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/requestlogintoken/`,
    {
      code: code,
    },
  );

export const getUser = (token) =>
  client.get(
    `${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/checkTokenFunction`,
    {
      token: token,
    },
  );
