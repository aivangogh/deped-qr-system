import { TotalAmountByYear, TrainingWithBudgetT } from '@/types/training';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type BudgetAllocationT = {
  budgets: TrainingWithBudgetT[];
  totalAmountByYear: TotalAmountByYear[];
  setBudgets: (budgets: TrainingWithBudgetT[]) => void;
  setTotalAmountByYear: (totalAmountByYear: TotalAmountByYear[]) => void;
};

const useBudgetAllocationStore = create<BudgetAllocationT>()(
  persist(
    (set) => ({
      budgets: [],
      totalAmountByYear: [],
      setBudgets: (budgets) => set({ budgets }),
      setTotalAmountByYear: (totalAmountByYear) => set({ totalAmountByYear }),
    }),
    {
      name: 'budgets',
    }
  )
);

export default useBudgetAllocationStore;
