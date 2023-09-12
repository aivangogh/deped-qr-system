import { BudgetAllocation } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type BudgetAllocationT = {
  budgets: BudgetAllocation[];
  setBudgets: (budgets: BudgetAllocation[]) => void;
};

const useBudgetAllocationStore = create<BudgetAllocationT>()(
  persist(
    (set) => ({
      budgets: [],
      setBudgets: (budgets) => set({ budgets }),
    }),
    {
      name: 'budgets',
    }
  )
);

export default useBudgetAllocationStore;
