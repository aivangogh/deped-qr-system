import { Pap } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PapsStoreT = {
  paps: Pap[];
  setPaps: (paps: Pap[]) => void;
  addPap: (pap: Pap) => void;
};

const usePapsStore = create<PapsStoreT>((set) => ({
  paps: [],
  setPaps: (paps) => set({ paps }),
  addPap: (pap) => set((state) => ({ paps: [pap, ...state.paps] })),
}));

export default usePapsStore;
