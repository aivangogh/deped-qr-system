import { Training } from '@prisma/client';

export type TrainingT = Training & {
  pap: {
    pap: string;
    papId: string;
  };
};
