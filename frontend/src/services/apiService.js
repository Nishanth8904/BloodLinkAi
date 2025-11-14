import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Base URL

const getStats = () => {
    return axios.get(`${API_URL}/api/stats`);
};

// We check the actuator health endpoint for system status
const getHealthStatus = () => {
    return axios.get(`${API_URL}/actuator/health`);
};

export const apiService = {
    getStats,
    getHealthStatus,
};