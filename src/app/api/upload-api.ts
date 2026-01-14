import { useMutation, useQuery } from '@tanstack/react-query';
import { post, get } from './http';
import type { UploadResponse } from '../../types';

const useUploadShipments = () =>
  useMutation<UploadResponse, Error, File>({
    mutationFn: (file) => {
      const formData = new FormData();
      formData.append('file', file);
      return post<UploadResponse>(`/uploads/upload/`, formData);
    },
  });

export function useGetUploadedShipments(upload_session_id: string) {
  return useQuery<UploadResponse | undefined>({
    queryKey: upload_session_id
      ? ['uploaded-shipments', upload_session_id]
      : ['uploaded-shipments', 'none'],
    queryFn: async () => {
      if (!upload_session_id) return undefined;
      return await get<UploadResponse>(
        `/uploads/upload-session/${upload_session_id}/`,
      );
    },
    enabled: !!upload_session_id,
  });
}

export default useUploadShipments;
