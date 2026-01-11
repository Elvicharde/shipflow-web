import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchShipments = async () => {
  const response = await apiClient.get('/shipments');
  return response.data;
};

export const createShipment = async (shipmentData) => {
  const response = await apiClient.post('/shipments', shipmentData);
  return response.data;
};

export const updateShipment = async (shipmentId, shipmentData) => {
  const response = await apiClient.put(`/shipments/${shipmentId}`, shipmentData);
  return response.data;
};

export const deleteShipment = async (shipmentId) => {
  const response = await apiClient.delete(`/shipments/${shipmentId}`);
  return response.data;
};