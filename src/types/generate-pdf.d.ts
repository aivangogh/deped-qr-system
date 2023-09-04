import { Participant, Speaker } from '@prisma/client';

export type GenerateCertificatesRequestForSpeakers = {
  url: string;
  speakers: Speaker[];
  training: TrainingsT;
};

export type GenerateCertificatesRequestForParticipants = {
  url: string;
  participants: Participant[];
  training: TrainingsT;
};
