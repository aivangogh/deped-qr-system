import { Training } from '@prisma/client';
import { type } from 'os';

export type BudgetAllocation = {
  amount: number;
  year: number;
};

export type TotalAmountByYear = {
  year: number;
  totalAmount: number;
};

export type TrainingT = Training & {
  pap: {
    pap: string;
    papId: string;
  };
};

export type TrainingWithBudgetT = {
  trainingCode: string;
  title: string;
  budgetAllocation: BudgetAllocation;
};

export type TrainingWithBudgetAndTotalAmountT = {
  trainingsWithBudget: TrainingWithBudgetT[];
  totalAmountByYear: TotalAmountByYear[];
};
