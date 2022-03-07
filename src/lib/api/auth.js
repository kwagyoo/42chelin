import { getCookie } from '../../common/Cookie';
import client from './client';

export const updatePassword = (data) =>
  client.put(`/user/${data.clusterName}/password`, {
    prevPassword: data.prevPassword,
    currPassword: data.currPassword,
  });

export const fetchRegister = (email, password, clusterName) =>
  client.post(`/user`, {
    email: email,
    password: password,
    clusterName: clusterName,
  });

export const fetchLogin = (id, password) =>
  client.get(`/user/${id}/login`, {
    params: {
      password,
    },
  });

export const fetchRefresh = (id) =>
  client.post(`/user/${id}/refresh`, { refresh_token: getCookie('refToken') });

export const fetchResetPassword = ({ email, clusterName }) =>
  client.post(`/user/reset`, { email: email, clusterName: clusterName });
