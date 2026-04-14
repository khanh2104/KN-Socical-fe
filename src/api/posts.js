import api from './http';
import { handleApiError } from './errorHandler';

export async function fetchFeed() {
  try {
    const response = await api.get('/posts/feed');
    return response.data;
  } catch (error) {
    handleApiError(error, 'fetchFeed');
  }
}

export async function createPost(payload) {
  try {
    const response = await api.post('/posts', payload);
    return response.data;
  } catch (error) {
    handleApiError(error, 'createPost');
  }
}

export async function likePost(postId) {
  try {
    const response = await api.post(`/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'likePost');
  }
}

export async function addComment(postId, payload) {
  try {
    const response = await api.post(`/posts/${postId}/comments`, payload);
    return response.data;
  } catch (error) {
    handleApiError(error, 'addComment');
  }
}
