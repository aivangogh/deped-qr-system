export type TrainingsT = {
  title: string;
  date: {
    from: Date;
    to: Date;
  };
  hours: number;
  venue: string;
  issuedOn: Date;
  issuedAt: Date;
  paps: string;
  trainingCode: string;
  validUntil: Date;
};

export type UpdateTrainingT = Omit<TrainingsT, 'trainingCode'>;