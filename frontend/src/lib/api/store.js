import client from './client';

export const writeReview = (request) =>
  client.post(`/store/${request.storeID}/review`, request);

export const updateStoreDetail = (request) =>
  client.put(`/store/${request.storeID}`, request);

export const searchStore = (storeName) =>
  client.get(`store/search`, {
    params: {
      storeName: storeName,
    },
  });

export const getStoreDetail = (request) =>
  client.get(`/store/${request.storeID}/`, {
    params: {
      clusterName: request.clusterName,
      storeAddress: request.storeAddress,
    },
  });

export const fetchRandomStore = () => client.get(`/store/random`);

export const toggleLikeStore = (request) => {
  const { clusterName, isLike } = request;
  return client.put(`/store/${request.storeID}/like`, {
    clusterName: clusterName,
    isLike: isLike,
  });
};
