import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchShipmentDetails } from '../../services/shipments.api';
import ShipmentEditPanel from '../../components/ShipmentEditPanel';
import LabelPreview from '../../components/LabelPreview';

const ShipmentDetails: React.FC = () => {
    const { shipmentId } = useParams<{ shipmentId: string }>();
    const [shipmentDetails, setShipmentDetails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getShipmentDetails = async () => {
            try {
                const data = await fetchShipmentDetails(shipmentId);
                setShipmentDetails(data);
            } catch (err) {
                setError('Failed to fetch shipment details');
            } finally {
                setLoading(false);
            }
        };

        getShipmentDetails();
    }, [shipmentId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Shipment Details</h1>
            {shipmentDetails && (
                <>
                    <ShipmentEditPanel shipment={shipmentDetails} />
                    <LabelPreview shipment={shipmentDetails} />
                </>
            )}
        </div>
    );
};

export default ShipmentDetails;