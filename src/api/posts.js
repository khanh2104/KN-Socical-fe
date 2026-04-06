import api from './http';

export async function fetchFeed() {
  const response = await api.get('/posts/feed');
  return response.data;
}

export async function createPost(payload) {
  const response = await api.post('/posts', payload);
  return response.data;
}

export async function likePost(postId) {
  const response = await api.post(`/posts/${postId}/like`);
  return response.data;
}

export async function addComment(postId, payload) {
  const response = await api.post(`/posts/${postId}/comments`, payload);
  return response.data;
}
