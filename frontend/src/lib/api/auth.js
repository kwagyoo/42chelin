import client from './client';

export const getToken = (code) =>
  client.post(
    `https://d2d5oodqrc.execute-api.ap-northeast-2.amazonaws.com/Stage/get-token`,
    {
      code: code,
    },
  );

export const getUser = (token) =>
  client.get(
    `https://d2d5oodqrc.execute-api.ap-northeast-2.amazonaws.com/Stage/get-user`,
    {
      token: token,
    },
  );
