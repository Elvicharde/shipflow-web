import { StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ShipmentsSlice, UploadSlice } from './types';

export const createShipmentsSlice: StateCreator<
  ShipmentsSlice & UploadSlice,
  [['zustand/immer', never]],
  [],
  ShipmentsSlice
> = (set) => ({
  invalidCount: 0,
  setInvalidCount: (count) =>
    set((state) => {
      state.invalidCount = count;
    }),
  clearInvalidCount: () =>
    set((state) => {
      state.invalidCount = 0;
    }),
});
