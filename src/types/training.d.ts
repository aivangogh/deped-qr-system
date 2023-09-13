import { Participant, Speaker, Training } from '@prisma/client';
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


export type TrainingWithoutBudgetT = {
  id: string;
  trainingCode: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  dateFrom: Date;
  dateTo: Date;
  numberOfHours: number;
  venue: string;
  addressOfTheVenue: string;
  issuedOn: Date;
  issuedAt: string;
  programHolder: string;
  officeId: string;
  office: string;
};
export type TrainingDetailsT = {
  training: TrainingWithoutBudgetT;
  speakers: Speaker[];
  participants: Participant[];
};
