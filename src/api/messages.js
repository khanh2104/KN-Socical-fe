import api from './http';
import { handleApiError } from './errorHandler';

export async function fetchThreads() {
  try {
    const response = await api.get('/messages/threads');
    return response.data;
  } catch (error) {
    handleApiError(error, 'fetchThreads');
  }
}

export async function fetchThread(threadId) {
  try {
    const response = await api.get(`/messages/threads/${threadId}`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'fetchThread');
  }
}

export async function sendMessage(threadId, content) {
  try {
    const response = await api.post(`/messages/threads/${threadId}/messages`, { content });
    return response.data;
  } catch (error) {
    handleApiError(error, 'sendMessage');
  }
}

export async function startThread(recipientUsername, content) {
  try {
    const response = await api.post('/messages', { recipientUsername, content });
    return response.data;
  } catch (error) {
    handleApiError(error, 'startThread');
  }
}
