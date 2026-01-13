import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createUploadSlice } from './features/upload-slice';
import { createShipmentsSlice } from './features/shipments-slice';
import { AppStoreState } from './features/types';

export type AppStore = AppStoreState;

export const useAppStore = create<AppStore>()(
  immer((set, get, store) => ({
    ...createUploadSlice(set, get, store),
    ...createShipmentsSlice(set, get, store),
  })),
);
