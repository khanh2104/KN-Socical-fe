import api from './http';
import { handleApiError } from './errorHandler';

export async function fetchFriends() {
  try {
    const response = await api.get('/friends');
    return response.data;
  } catch (error) {
    handleApiError(error, 'fetchFriends');
  }
}

export async function fetchFriendRequests() {
  try {
    const response = await api.get('/friends/requests');
    return response.data;
  } catch (error) {
    handleApiError(error, 'fetchFriendRequests');
  }
}

export async function sendFriendRequest(username) {
  try {
    const response = await api.post('/friends/request', { username });
    return response.data;
  } catch (error) {
    handleApiError(error, 'sendFriendRequest');
  }
}

export async function respondFriendRequest(requestId, accept) {
  try {
    const action = accept ? 'accept' : 'reject';
    const response = await api.post(`/friends/requests/${requestId}/${action}`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'respondFriendRequest');
  }
}
