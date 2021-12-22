import axios from 'axios';
import { getCookie } from '../../common/Cookie';
import TokenVerify from '../../common/TokenVerify';

const client = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_ENDPOINT_URL,
});

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    console.log('axios after', error);
    if (status === 403) {
      const originalRequest = config;
      await TokenVerify();
      originalRequest.headers.Authorization = `Bearer ${getCookie('accToken')}`;
      console.log(originalRequest);
      return axios(originalRequest);
    } else {
      return Promise.reject(error);
    }
  },
);

export default client;
