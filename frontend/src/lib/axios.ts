
import axios from 'axios';
import { getToken } from './storage';

const api = axios.create({ baseURL: (import.meta as any).env.VITE_API_BASE + '/api' });

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
