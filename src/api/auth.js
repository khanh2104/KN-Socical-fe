import api from './http';
import { handleApiError } from './errorHandler';

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
    handleApiError(error, 'login');
  }
}

export async function register(payload) {
  try {
    const response = await api.post('/auth/register', payload);
    return response.data;
  } catch (error) {
    handleApiError(error, 'register');
  }
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
