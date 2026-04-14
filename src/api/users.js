import api from './http';
import { handleApiError } from './errorHandler';

export async function fetchProfile(username) {
  try {
    const response = await api.get(username === 'me' ? '/users/me' : `/users/${username}`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'fetchProfile');
  }
}

export async function fetchCurrentUser() {
  try {
    const response = await api.get('/users/me');
    return response.data;
  } catch (error) {
    handleApiError(error, 'fetchCurrentUser');
  }
}

export async function updateProfile(payload) {
  try {
    const response = await api.put('/users/profile', payload);
    return response.data;
  } catch (error) {
    handleApiError(error, 'updateProfile');
  }
}

export async function searchUsers(query) {
  try {
    const response = await api.get('/users/search', { params: { q: query } });
    return response.data;
  } catch (error) {
    handleApiError(error, 'searchUsers');
  }
}
