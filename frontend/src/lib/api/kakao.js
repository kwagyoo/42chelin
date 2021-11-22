import client from './client';

export const searchKakao = (query) =>
  client.get(`${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/searchkakao`, {
    params: {
      storeName: query,
    },
  });

export const getStoreInfoKakao = async (request) => {
  try {
    const res = await client.get(
      `${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/getstorekakao`,
      {
        params: {
          id: request.id,
          storeName: request.placeName,
        },
      },
    );
    return res.data.body;
  } catch (error) {
    return Promise.reject(error);
  }
};
