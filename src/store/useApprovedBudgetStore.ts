import { ApprovedBudget } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ApprovedBudgetT = {
  approvedBudgets: ApprovedBudget[];
  setApprovedBudget: (approvedBudget: ApprovedBudget[]) => void;
  updateApprovedBudget: (approvedBudget: ApprovedBudget) => void;
  deleteApprovedBudget: (id: string) => void;
};

const useApprovedBudgetStore = create<ApprovedBudgetT>()(
  persist(
    (set) => ({
      approvedBudgets: [],
      setApprovedBudget: (approvedBudgets) => set({ approvedBudgets }),
      updateApprovedBudget: (approvedBudget) =>
        set((state) => ({
          approvedBudgets: state.approvedBudgets.map((budget) =>
            budget.id === approvedBudget.id ? approvedBudget : budget
          ),
        })),
      deleteApprovedBudget: (id) =>
        set((state) => ({
          approvedBudgets: state.approvedBudgets.filter(
            (budget) => budget.id !== id
          ),
        })),
    }),
    {
      name: 'approvedBudget',
    }
  )
);

export default useApprovedBudgetStore;
