import client from './client';

export const SearchKakao = (query) =>
  client.get(`${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/searchkakao`, {
    params: {
      storeName: query,
    },
  });
