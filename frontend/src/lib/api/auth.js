import { getCookie } from '../../common/Cookie';
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
  client.post(`/user/test`, {
    code: code,
    id: id,
    password: password,
  });

export const fetchLogin = (id, password) =>
  client.get(
    `/user/${id}/login`,
    {
      params: {
        password,
      },
    },
    { withCredentials: true },
  );

export const fetchReset = (id) =>
  client.post(`/user/${id}/refresh`, {
    headers: {
      Authorization: `Bearer ${getCookie('accToken')}`,
    },
    withCredentials: true,
  });
