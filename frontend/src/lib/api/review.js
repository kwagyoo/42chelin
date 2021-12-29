import client from './client';

export const updateReview = (path, request) =>
  client.put(`/store/${path.storeID}/review/${path.reviewID}`, request);

export const deleteReview = (request) =>
  client.delete(`/store/${request.storeID}/review/${request.reviewID}`);
