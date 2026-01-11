import axios from 'axios';
import { Shipment } from '../types/shipment';

const API_BASE_URL = 'http://localhost:8000/api'; // Update with your API base URL

export const fetchShipments = async (): Promise<Shipment[]> => {
    const response = await axios.get<Shipment[]>(`${API_BASE_URL}/shipments/`);
    return response.data;
};

export const createShipment = async (shipment: Shipment): Promise<Shipment> => {
    const response = await axios.post<Shipment>(`${API_BASE_URL}/shipments/`, shipment);
    return response.data;
};

export const updateShipment = async (id: string, shipment: Shipment): Promise<Shipment> => {
    const response = await axios.put<Shipment>(`${API_BASE_URL}/shipments/${id}/`, shipment);
    return response.data;
};

export const deleteShipment = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/shipments/${id}/`);
};