import api from './http';

export async function fetchThreads() {
  const response = await api.get('/messages/threads');
  return response.data;
}

export async function fetchThread(threadId) {
  const response = await api.get(`/messages/threads/${threadId}`);
  return response.data;
}

export async function sendMessage(threadId, content) {
  const response = await api.post(`/messages/threads/${threadId}/messages`, { content });
  return response.data;
}

export async function startThread(recipientUsername, content) {
  const response = await api.post('/messages', { recipientUsername, content });
  return response.data;
}
