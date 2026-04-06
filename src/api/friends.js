import api from './http';

export async function fetchFriends() {
  const response = await api.get('/friends');
  return response.data;
}

export async function fetchFriendRequests() {
  const response = await api.get('/friends/requests');
  return response.data;
}

export async function sendFriendRequest(username) {
  const response = await api.post('/friends/request', { username });
  return response.data;
}

export async function respondFriendRequest(requestId, accept) {
  const action = accept ? 'accept' : 'reject';
  const response = await api.post(`/friends/requests/${requestId}/${action}`);
  return response.data;
}
