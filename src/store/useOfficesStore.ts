import { Office } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type OfficesStoreT = {
  offices: Office[];
  setOffices: (offices: Office[]) => void;
  addOffice: (office: Office) => void;
  removeOffice: (office: Office) => void;
};

const useOfficesStore = create<OfficesStoreT>((set) => ({
  offices: [],
  setOffices: (offices) => set({ offices }),
  addOffice: (office) => set((state) => ({ offices: [...state.offices, office] })),
  removeOffice: (office) => set((state) => ({ offices: state.offices.filter((o) => o.id !== office.id) })),
}));

export default useOfficesStore;
