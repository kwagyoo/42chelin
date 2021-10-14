import client from './client';

export const getToken = (code) =>
  client.post(`${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/get-token`, {
    code: code,
  });

export const getUser = (token) =>
  client.get(`${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/get-user`, {
    token: token,
  });

export const saveStoreData = (request) => {
  const userToken = localStorage.getItem('token');
  if (!userToken) return null;
  console.log(request);
  client.post(`${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/save-store-data`, {
    token: userToken,
  });
};
