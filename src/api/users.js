import api from './http';

export async function fetchProfile(username) {
  const response = await api.get(username === 'me' ? '/users/me' : `/users/${username}`);
  return response.data;
}

export async function fetchCurrentUser() {
  const response = await api.get('/users/me');
  return response.data;
}

export async function updateProfile(payload) {
  const response = await api.put('/users/profile', payload);
  return response.data;
}

export async function searchUsers(query) {
  const response = await api.get('/users/search', { params: { q: query } });
  return response.data;
}
