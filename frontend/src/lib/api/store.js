import client from './client';

export const saveStoreData = async (request) => {
  console.log('start');
  const userToken = localStorage.getItem('token');
  if (!userToken) return null;
  console.log(request);
  const res = await client.post(
    `${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/save-store-data`,
    {
      token: userToken,
      ...request,
    },
  );
  console.log('save data', res);
};

export const loadAllStoreData = async () => {
  try {
    const res = await client.get(
      `${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/stores`,
    );
    console.log('read', res);
    return JSON.parse(res.data.body);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const searchStoreData = async (request) => {
  try {
    const res = await client.get(
      `${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/search`,
      {
        params: {
          storeName: request.storeName,
        },
      },
    );
    console.log('search', res);
    return JSON.parse(res.data.body);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const getStoreDetailData = async (request) => {
  try {
    const res = await client.get(
      `${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/stores/detail`,
      {
        params: {
          storeName: request.storeName,
          storeBranch: JSON.stringify(request.storeBranch),
        },
      },
    );
    console.log('search', res);
    return res.data.body;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
