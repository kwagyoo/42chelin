import client from './client';
import { getCookie } from '../../common/Cookie';

export const fetchKakaoApi = (query) =>
  client.get(`store/search/kakao`, {
    params: {
      storeName: query,
    },
  });

// 어떤 동작인지 정확히 모르겠음.
export const getStoreInfoKakao = async (request) => {
  try {
    const res = await client.get(`/store/${request.id}/kakao`, {
      params: {
        storeName: request.placeName,
      },
    });
    return res.data.body;
  } catch (error) {
    return Promise.reject(error);
  }
};
