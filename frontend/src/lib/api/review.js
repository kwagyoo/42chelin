import client from './client';
import { getCookie } from '../../common/Cookie';

export const updateReview = (request) =>
  client.post(`/stores/update`, request, {
    headers: {
      Authorization: `Bearer ${getCookie('accToken')}`,
    },
  });

export const deleteReview = (request) =>
  client.delete(
    `/store/${request.storeID}/review/${request.reviewID}`,
    request,
    {
      headers: {
        Authorization: `Bearer ${getCookie('accToken')}`,
      },
    },
  );
