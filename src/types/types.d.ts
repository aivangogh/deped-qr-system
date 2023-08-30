import { Training } from '../app/trainings/data/columns';

export type TrainingDetailsT = {
  trainingCode: string;
  title: string;
  date: {
    start: Date;
    end: Date;
  };
  hours: number;
  speaker?: string;
  programHolder?: string;
  nameOfProgramHolder?: string;
};

export type SpeakerDetailsT = {
  speakerId?: string;
  speaker: string;
  trainingId?: string;
};

export type ParticipantDetailsT = {
  participantId: string;
  participant: string;
  position: string;
  school: string;
  contact: string;
  email: string;
  trainingId?: string;
};

export type TrainingInfoT = {
  training: TrainingDetails;
  speakers: SpeakerDetailsT[];
  participants: ParticipantDetails[];
};
