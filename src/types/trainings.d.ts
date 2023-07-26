import { Training } from '@prisma/client';

export type TrainingsT = {
  title: string;
  date: {
    from: Date;
    to: Date;
  };
  numberOfHours: number;
  venue: string;
  issuedOn: Date;
  issuedAt: string;
  papId: string;
  trainingCode: string;
  validUntil: Date;
};

export type TrainingsWithPapT = Training & {
  pap: {
    pap: string;
    papId: string;
  };
};

export type CreateTrainingT = Omit<TrainingsT, 'trainingCode'>;
export type UpdateTrainingT = Omit<TrainingsT, 'trainingCode'>;
