import client from './client';

export const getToken = (code) =>
  client.post(`${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/get-token`, {
    code: code,
  });

export const getUser = (token) =>
  client.get(`${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/get-user`, {
    params: {
      token: token,
    },
  });

export const saveStoreData = async (request) => {
  console.log('start');
  const userToken = localStorage.getItem('token');
  if (!userToken) return null;
  console.log(request);
  const res = await client.post(
    `${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/save-store-data`,
    {
      token: userToken,
      ...request,
    },
  );
  console.log('save data', res);
};
