import client from './client';

export const saveStoreData = (request) =>
  client.post(
    `${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/save-store-data`,
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
      storeName: request.storeName,
      storeBranch: JSON.stringify(request.storeBranch),
    },
  });
