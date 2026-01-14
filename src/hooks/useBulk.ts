import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import useUploadShipments, {
  useGetUploadedShipments,
} from '../app/api/upload-api';
import { Shipment } from '../types/shipment';
import { get } from '../app/api/http';
import { post } from '../app/api/http';

const useBulk = () => {
  const [bulkData, setBulkData] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

//   const { data: shipments, refetch } = useQuery(
//     ['bulkShipments'],
//     () => get<Shipment[]>('/shipments/'),
//     {
//       onError: (err: any) => {
//         setError(err.message);
//       },
//     },
//   );

//   const mutation = useMutation<Shipment[], Error, File>(
//     async (file: File) => {
//       const formData = new FormData();
//       formData.append('file', file);
//       return post<Shipment[]>('/uploads/upload/', formData);
//     },
//     {
//       onSuccess: (data) => {
//         setBulkData(data);
//         refetch();
//       },
//       onError: (err: any) => {
//         setError(err.message);
//       },
//       onSettled: () => {
//         setIsLoading(false);
//       },
//     },
//   );

//   const handleUpload = async (file: File) => {
//     try {
//       await mutation.mutateAsync(file);
//     } catch (err: any) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError(String(err));
//       }
//     }
//   };

  return {
    bulkData,
    isLoading,
    error,
    // handleUpload,
    // shipments,
  };
};

export default useBulk;
