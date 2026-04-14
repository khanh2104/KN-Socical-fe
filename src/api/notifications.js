import api from './http';
import { handleApiError } from './errorHandler';

export async function fetchNotifications() {
  try {
    const response = await api.get('/notifications');
    return response.data;
  } catch (error) {
    handleApiError(error, 'fetchNotifications');
  }
}

export async function markAllRead() {
  try {
    const response = await api.put('/notifications/read-all');
    return response.data;
  } catch (error) {
    handleApiError(error, 'markAllRead');
  }
}
