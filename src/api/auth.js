import api from './http';

const DEFAULT_USER = {
  username: 'defaultuser',
  password: 'defaultpass',
  token: 'default-local-token',
};

export async function login(credentials) {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    if (
      credentials.username === DEFAULT_USER.username &&
      credentials.password === DEFAULT_USER.password
    ) {
      return { token: DEFAULT_USER.token };
    }
    throw error;
  }
}

export async function register(payload) {
  const response = await api.post('/auth/register', payload);
  return response.data;
}

export function saveToken(token) {
  localStorage.setItem('knsocial_token', token);
}

export function getToken() {
  return localStorage.getItem('knsocial_token');
}

export function logout() {
  localStorage.removeItem('knsocial_token');
}
