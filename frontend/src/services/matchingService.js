import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

const findBestDonors = (params) => {
  return axios.post(`${API_BASE}/match`, params);
};

export default { findBestDonors };
