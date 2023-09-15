import { TotalAmountByYear, TrainingWithBudgetT } from '@/types/training';
import { create } from 'zustand';

type BudgetAllocationT = {
  budgets: TrainingWithBudgetT[];
  totalAmountByYear: TotalAmountByYear[];
  setBudgets: (budgets: TrainingWithBudgetT[]) => void;
  setTotalAmountByYear: (totalAmountByYear: TotalAmountByYear[]) => void;
};

const useBudgetAllocationStore = create<BudgetAllocationT>((set) => ({
  budgets: [],
  totalAmountByYear: [],
  setBudgets: (budgets) => set({ budgets }),
  setTotalAmountByYear: (totalAmountByYear) => set({ totalAmountByYear }),
}));

export default useBudgetAllocationStore;
