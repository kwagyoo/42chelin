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

export const updatePassword = (data) =>
  client.put(`/user/${data.clusterName}/password`, {
    prevPassword: data.prevPassword,
    currPassword: data.currPassword,
  });

export const fetchRegister = (code, email, password) =>
  client.post(`/user/test`, {
    code: code,
    email: email,
    password: password,
  });

export const fetchLogin = (id, password) =>
  client.get(`/user/${id}/login`, {
    params: {
      password,
    },
  });

export const fetchRefresh = (id) =>
  client.post(`/user/${id}/refresh`, { refresh_token: getCookie('refToken') });

export const fetchResetPassword = (code) =>
  client.post(`/user/reset`, { code });
