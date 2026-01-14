import { useAppSelector } from './useAppStore';

export const useInvalidCount = () => useAppSelector((s) => s.invalidCount);

export const useSetInvalidCount = () =>
  useAppSelector((s) => s.setInvalidCount);
