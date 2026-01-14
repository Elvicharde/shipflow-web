import { useShallow } from 'zustand/react/shallow';
import { useAppStore } from '../store';
import { AppStore } from '../store';

/**
 * Redux-like selector wrapper for Zustand
 * Fully typed, shallow memo by default
 */
export const useAppSelector = <T>(selector: (state: AppStore) => T): T =>
  useAppStore(useShallow(selector));
