import { create } from 'zustand';
import { materialApi } from '../api/material';
import { MaterialItem, PurchaseStatus } from '../types';

interface MaterialState {
  materials: MaterialItem[];
  fetchMaterials: () => Promise<void>;
  updateStatus: (id: string, status: PurchaseStatus) => Promise<void>;
}

export const useMaterialStore = create<MaterialState>((set) => ({
  materials: [],
  async fetchMaterials() {
    set({ materials: await materialApi.list() });
  },
  async updateStatus(id, status) {
    await materialApi.updateStatus(id, status);
    set((state) => ({ materials: state.materials.filter((item) => item.id !== id) }));
  }
}));
