import axios from './axios';
import { Shipment } from '../types/shipment';

const BASE_URL = '/api/pricing';

export const fetchPricing = async (shipment: Shipment): Promise<number> => {
    try {
        const response = await axios.post(`${BASE_URL}/calculate`, shipment);
        return response.data.price;
    } catch (error) {
        console.error('Error fetching pricing:', error);
        throw error;
    }
};

export const fetchBulkPricing = async (shipments: Shipment[]): Promise<number[]> => {
    try {
        const response = await axios.post(`${BASE_URL}/bulk`, shipments);
        return response.data.prices;
    } catch (error) {
        console.error('Error fetching bulk pricing:', error);
        throw error;
    }
};