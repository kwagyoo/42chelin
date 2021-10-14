import client from './client';

export const getToken = (code) => {
  client.post(`${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/get-token`, {
    code: code,
  });
};

export const getUser = (token) => {
  client.get(`${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/get-user`, {
    token: token,
  });
};

export const test = (code) => {
  client.post(`${process.env.REACT_APP_INTRA}oauth/token`, {
    grant_type: 'authorization_code',
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.REACT_APP_CLIENT_SERECT,
    code: code,
    redirect_uri: `${process.env.REACT_APP_REDIECT_URL}`,
  });
};
