import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { uploadBulkShipments, fetchBulkShipments } from '../services/uploads.api';
import { BulkShipment } from '../types/upload';

const useBulk = () => {
    const [bulkData, setBulkData] = useState<BulkShipment[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { data: shipments, refetch } = useQuery('bulkShipments', fetchBulkShipments, {
        onError: (err) => {
            setError(err.message);
        },
    });

    const mutation = useMutation(uploadBulkShipments, {
        onMutate: () => {
            setIsLoading(true);
            setError(null);
        },
        onSuccess: (data) => {
            setBulkData(data);
            refetch();
        },
        onError: (err) => {
            setError(err.message);
        },
        onSettled: () => {
            setIsLoading(false);
        },
    });

    const handleUpload = async (file: File) => {
        try {
            await mutation.mutateAsync(file);
        } catch (err) {
            setError(err.message);
        }
    };

    return {
        bulkData,
        isLoading,
        error,
        handleUpload,
        shipments,
    };
};

export default useBulk;