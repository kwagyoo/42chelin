import client from './client';
import { getCookie } from '../../common/Cookie';

export const updateReview = (path, request) =>
  client.put(`/store/${path.storeID}/review/${path.reviewID}`, request, {
    headers: {
      Authorization: `Bearer sdf${getCookie('accToken')}`,
    },
  });

export const deleteReview = (request) =>
  client.delete(`/store/${request.storeID}/review/${request.reviewID}`, {
    headers: {
      Authorization: `Bearer ${getCookie('accToken')}`,
    },
  });
