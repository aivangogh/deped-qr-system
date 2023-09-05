import { Training } from '@prisma/client';

export type TrainingsT = {
  title: string;
  dateFrom: Date;
  dateTo: Date;
  numberOfHours: number;
  venue: string;
  addressOfTheVenue: string;
  issuedOn: Date;
  issuedAt: string;
  papId: string;
  pap?: string;
  trainingCode: string;
  validUntil: Date;
};

export type TrainingsWithPapT = Training & {
  pap: {
    pap: string;
    papId: string;
  };
};

export type CreateTrainingT = Omit<TrainingsT, 'trainingCode' | 'pap'>;
export type UpdateTrainingT = Omit<TrainingsT, 'trainingCode' | 'pap'>;
