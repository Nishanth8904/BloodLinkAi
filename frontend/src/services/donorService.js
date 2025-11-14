// src/services/donorService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Fetches all donors from the backend.
 * Returns the data array directly for use with TanStack Query.
 */
const getAllDonors = async () => {
    const response = await axios.get(`${API_BASE_URL}/donors`);
    return response.data;
};

/**
 * Fetches the count of donors grouped by location for the map feature.
 */
const getDonorCountsByLocation = async () => {
    const response = await axios.get(`${API_BASE_URL}/map/donor-counts`);
    return response.data;
};

/**
 * Creates a new donor.
 * @param {object} donorData - The donor object to create.
 */
const createDonor = (donorData) => {
    return axios.post(`${API_BASE_URL}/donors`, donorData);
};

/**
 * Updates an existing donor by their ID.
 * @param {number|string} id - The ID of the donor to update.
 * @param {object} donorData - The updated donor data.
 */
const updateDonor = (id, donorData) => {
    return axios.put(`${API_BASE_URL}/donors/${id}`, donorData);
};

/**
 * Deletes a donor by their ID.
 * @param {number|string} id - The ID of the donor to delete.
 */
const deleteDonor = (id) => {
    return axios.delete(`${API_BASE_URL}/donors/${id}`);
};

// A single object containing all the service functions to be exported
const donorService = {
    getAllDonors,
    getDonorCountsByLocation, // Ensure this is included
    createDonor,
    updateDonor,
    deleteDonor,
};

export default donorService;