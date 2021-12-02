import client from './client';

export const updateReview = (request) => client.post(`/stores/update`, request);

export const deleteReview = (request) => client.post(`/stores/delete`, request);
