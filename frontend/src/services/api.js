import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Donor API
export const donorAPI = {
  getAll: () => api.get('/api/donors'),
  getById: (id) => api.get(`/api/donors/${id}`),
  create: (donor) => api.post('/api/donors', donor),
  // --- NEW: Function to update a donor ---
  update: (id, donor) => api.put(`/api/donors/${id}`, donor),
  // --- NEW: Function to delete a donor ---
  delete: (id) => api.delete(`/api/donors/${id}`),
  search: (params) => api.get('/api/donors/search', { params }),
};

// Patient API
export const patientAPI = {
  getAll: () => api.get('/api/patients'),
  getById: (id) => api.get(`/api/patients/${id}`),
  create: (patient) => api.post('/api/patients', patient),
};

// Request API
export const requestAPI = {
  getAll: () => api.get('/api/requests'),
  create: (request) => api.post('/api/requests', request),
  findMatches: (request) => api.post('/api/match', request),
  updateStatus: (id, status) => api.put(`/api/requests/${id}/status?status=${status}`),
};

// AI API
export const aiAPI = {
  predict: (request) => api.post('/api/ai/predict', request),
  health: () => api.get('/api/ai/health'),
};

// Health API
export const healthAPI = {
  check: () => api.get('/api/health'),
  hello: () => api.get('/hello'),
};

export default api;