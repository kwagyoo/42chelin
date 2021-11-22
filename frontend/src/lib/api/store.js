import client from './client';

export const saveStoreData = (request) =>
  client.post(
    `${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/stores/save`,
    request,
  );

export const updateStoreReview = (request) =>
  client.post(
    `${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/stores/update`,
    request,
  );

export const deleteStoreReview = (request) =>
  client.post(
    `${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/stores/delete`,
    request,
  );

export const loadAllStoreData = () =>
  client.get(`${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/stores`);

export const searchStoreData = (storeName) =>
  client.get(`${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/search`, {
    params: {
      storeName: storeName,
    },
  });

export const getStoreDetailData = (request) =>
  client.get(`${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/stores/detail`, {
    params: {
      userName: request.userName,
      storeName: request.storeName,
      storeAddress: request.storeAddress,
    },
  });

export const getRandomStore = () =>
  client.get(`${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/stores/random`);

export const toggleLikeStore = (request) => {
  const { token, storeName, storeAddress, userName, isLike } = request;
  return client.post(
    `${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/stores/like`,
    {
      token: token,
      storeName: storeName,
      storeAddress: storeAddress,
      userName: userName,
      isLike: isLike,
    },
  );
};
