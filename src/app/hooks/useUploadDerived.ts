import { useUploadResults } from './useUpload';

export const useInvalidRows = () => {
  const results = useUploadResults();
  return results.filter((r) => r.status !== 'valid');
};

export const useAreAllValid = () => {
  const invalid = useInvalidRows();
  return invalid.length === 0;
};
