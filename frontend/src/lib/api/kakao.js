import client from './client';

export const fetchKakaoApi = (query) =>
  client.get(`/searchkakao`, {
    params: {
      storeName: query,
    },
  });

// 어떤 동작인지 정확히 모르겠음.
export const getStoreInfoKakao = async (request) => {
  try {
    const res = await client.get(`/getstorekakao`, {
      params: {
        id: request.id,
        storeName: request.placeName,
      },
    });
    return res.data.body;
  } catch (error) {
    return Promise.reject(error);
  }
};
