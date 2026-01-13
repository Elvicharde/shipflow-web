/**
 * Shared type definitions for store slices
 * This file prevents circular dependencies between slices
 */

import type { UploadSession, UploadResponse, UploadResult } from '../../types';

export interface ShipmentsSlice {
  invalidCount: number;
  setInvalidCount: (count: number) => void;
  clearInvalidCount: () => void;
}

export interface UploadSlice {
  sessionId: string | null;
  results: UploadResult[];
  uploadResponse: UploadResponse | null;
  filename: UploadSession['filename'] | null | undefined;
  setSessionId: (id: string) => void;
  setResults: (rows: UploadResult[]) => void;
  setUploadResponse: (response: UploadResponse) => void;
  resetUpload: () => void;
}

export type AppStoreState = UploadSlice & ShipmentsSlice;
