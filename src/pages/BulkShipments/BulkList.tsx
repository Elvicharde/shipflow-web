import React, { useEffect, useState } from 'react';
import { fetchShipments } from '../../services/shipments.api';
import ShipmentsTable from '../../components/ShipmentsTable';
import BulkFilters from '../../components/Bulk/BulkFilters';

const BulkList: React.FC = () => {
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadShipments = async () => {
            try {
                const data = await fetchShipments();
                setShipments(data);
            } catch (err) {
                setError('Failed to fetch shipments');
            } finally {
                setLoading(false);
            }
        };

        loadShipments();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Bulk Shipments</h1>
            <BulkFilters />
            <ShipmentsTable shipments={shipments} />
        </div>
    );
};

export default BulkList;