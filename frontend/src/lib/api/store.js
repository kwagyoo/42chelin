import client from './client';

export const saveStoreData = (request) => {
  client.post(
    `${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/save-store-data`,
    request,
  );
};

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
      storeAddress: request.storeAddress,
    },
  });

export const GetStoreInfoKakao = async (request) => {
  try {
    console.log(request);
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
    console.error(error);
    return Promise.reject(error);
  }
};
