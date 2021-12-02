import client from './client';

export const createStore = (request) => client.post(`/stores/save`, request);

export const getAllStore = () => client.get(`/stores`);

export const searchStore = (storeName) =>
  client.get(`/search`, {
    params: {
      storeName: storeName,
    },
  });

export const getStoreDetail = (request) =>
  client.get(`/stores/detail`, {
    params: {
      userName: request.userName,
      storeName: request.storeName,
      storeAddress: request.storeAddress,
    },
  });

export const fetchRandomStore = () => client.get(`/store/random`);

export const toggleLikeStore = (request) => {
  const { token, storeName, storeAddress, userName, isLike } = request;
  return client.post(`/stores/like`, {
    token: token,
    storeName: storeName,
    storeAddress: storeAddress,
    userName: userName,
    isLike: isLike,
  });
};
