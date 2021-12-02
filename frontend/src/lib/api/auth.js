import client from './client';

export const fetchToken = (code) =>
  client.post(`/${process.env.REACT_APP_GET_TOKEN}`, {
    code: code,
  });

export const fetchUser = (token) =>
  client.get(`/get-user`, {
    params: {
      token: token,
    },
  });

export const fetchRegister = (code, id, password) =>
  client.post(`/user`, {
    code: code,
    id: id,
    password: password,
  });
