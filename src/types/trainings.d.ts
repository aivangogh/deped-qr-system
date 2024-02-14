import { Training } from '@prisma/client';

export type TrainingsT = {
  trainingCode: string;
  title: string;
  amount: number;
  year: string | number;
  dateFrom: Date;
  dateTo: Date;
  numberOfHours: number;
  venue: string;
  addressOfTheVenue: string;
  issuedOn: Date;
  issuedAt: string;
  officeId: string;
  office?: string;
  programHolder: string;
};

export type TrainingsWithPapT = Training & {
  pap: {
    pap: string;
    papId: string;
  };
};

export type CreateTrainingT = Omit<
  TrainingsT,
  'trainingCode' | 'pap' | 'office' | 'papId' | 'validUntil'
>;
export type UpdateTrainingT = Omit<
  TrainingsT,
  | 'trainingCode'
  | 'amount'
  | 'year'
  | 'dateFrom'
  | 'dateTo'
  | 'issuedOn'
  | 'pap'
  | 'office'
  | 'papId'
  | 'validUntil'
>;
