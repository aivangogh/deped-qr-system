import { Training } from '../app/trainings/data/columns';

export type TrainingDetailsT = {
  trainingId: string;
  title: string;
  date: {
    start: Date;
    end: Date;
  };
  hours: number;
  programHolder: string;
};

export type ParticipantDetailsT = {
  participant: string;
  position: string;
  school: string;
  contact: string;
  email: string;
};

export type TrainingInfoT = {
  training: TrainingDetails;
  participants: ParticipantDetails[];
};
