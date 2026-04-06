import api from './http';

export async function fetchNotifications() {
  const response = await api.get('/notifications');
  return response.data;
}

export async function markAllRead() {
  const response = await api.put('/notifications/read-all');
  return response.data;
}
