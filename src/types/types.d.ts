import { Training } from '../app/trainings/data/columns';

export type TrainingDetailsT = {
  trainingId: string;
  title: string;
  date: {
    start: Date;
    end: Date;
  };
  hours: number;
  speaker: string;
  programHolder?: string;
  nameOfProgramHolder?: string;
};

export type SpeakerDetailsT = {
  speakerId?: string;
  speaker: string;
};

export type ParticipantDetailsT = {
  participantId: string;
  participant: string;
  position: string;
  school: string;
  contact: string;
  email: string;
};

export type TrainingInfoT = {
  training: TrainingDetails;
  speaker: SpeakerDetailsT[];
  participants: ParticipantDetails[];
};
