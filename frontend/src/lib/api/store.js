import client from './client';
import { getCookie } from '../../common/Cookie';

export const writeReview = (request) =>
  client.post(
    `/store/${request.storeID}/review`,
    request,
    { refresh_token: getCookie('refToken') },
    {
      headers: {
        Authorization: `Bearer ${getCookie('accToken')}`,
      },
    },
  );

export const searchStore = (storeName) =>
  client.get(`store/search`, {
    params: {
      storeName: storeName,
    },
  });

export const getStoreDetail = (request) =>
  client.get(`/store/${request.storeID}/`, {
    headers: {
      Authorization: `Bearer ${getCookie('accToken')}`,
    },
    params: {
      clusterName: request.clusterName,
      storeAddress: request.storeAddress,
    },
  });

export const fetchRandomStore = () => client.get(`/store/random`);

export const toggleLikeStore = (request) => {
  const { clusterName, isLike } = request;
  return client.put(
    `/store/${request.storeID}/like`,
    {
      clusterName: clusterName,
      isLike: isLike,
    },
    {
      headers: {
        Authorization: `Bearer ${getCookie('accToken')}`,
      },
    },
  );
};
