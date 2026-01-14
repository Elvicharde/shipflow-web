import { StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { UploadSlice, ShipmentsSlice } from './types';

export const createUploadSlice: StateCreator<
  UploadSlice & ShipmentsSlice,
  [['zustand/immer', never]],
  [],
  UploadSlice
> = (set) => ({
  sessionId: null,
  results: [],
  setSessionId: (id) =>
    set((state) => {
      state.sessionId = id;
    }),
  setResults: (rows) =>
    set((state) => {
      state.results = rows;
    }),
  uploadResponse: null,
  filename: null,
  setUploadResponse: (response) =>
    set((state) => {
      state.uploadResponse = response;
      state.sessionId = response.upload_session_id;
      state.results = response.results;
    }),
  resetUpload: () =>
    set((state) => {
      state.sessionId = null;
      state.results = [];
      state.uploadResponse = null;
    }),
});
