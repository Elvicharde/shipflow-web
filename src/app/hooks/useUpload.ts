import { useAppSelector } from './useAppStore';

export const useUploadSessionId = () => useAppSelector((s) => s.sessionId);

export const useUploadResults = () => useAppSelector((s) => s.results);

export const useUploadReset = () => useAppSelector((s) => s.resetUpload);
