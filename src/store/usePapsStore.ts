import { Pap } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PapsStoreT = {
  paps: Pap[];
  setPaps: (paps: Pap[]) => void;
};

const usePapsStore = create<PapsStoreT>((set) => ({
  paps: [],
  setPaps: (paps) => set({ paps }),
}));

export default usePapsStore;
