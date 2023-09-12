import { Training } from '@prisma/client';

export type TrainingT = Training & {
  pap: {
    pap: string;
    papId: string;
  };
};

export type TrainingWithBudgetT = {
  trainingCode: string;
  title: string;
  budgetAllocation: {
    amount: number;
    year: number;
  };
};
