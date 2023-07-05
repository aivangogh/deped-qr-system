import {
  ParticipantDetailsT,
  SpeakerDetailsT,
  TrainingDetailsT,
} from '@/types/types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type TrainingInfoT = {
  trainingInfo: TrainingDetailsT;
  speakers: SpeakerDetailsT[];
  participants: ParticipantDetailsT[];
  setTrainingInfo: (trainingInfo: TrainingDetailsT) => void;
  setSpeakers: (speakers: SpeakerDetailsT[]) => void;
  setParticipants: (participants: ParticipantDetailsT[]) => void;
  resetInfo: () => void;
};

const defaultTrainingInfo: TrainingDetailsT = {
  trainingId: 'Invalid ID',
  title: '',
  date: {
    start: new Date(),
    end: new Date(),
  },
  hours: 0,
  programHolder: '',
  nameOfProgramHolder: '',
  speaker: '',
};

const useTrainingInfoStore = create<TrainingInfoT>()(
  persist(
    (set) => ({
      trainingInfo: defaultTrainingInfo,
      participants: [],
      speakers: [],
      setTrainingInfo: (trainingInfo: any) => set({ trainingInfo }),
      setSpeakers: (speakers) =>
        set((state) => ({
          speakers: speakers.filter((s) => s.speaker),
        })),
      setParticipants: (participants) =>
        set((state) => ({
          participants: participants.filter((p) => p.participant),
        })),
      resetInfo: () =>
        set({
          trainingInfo: defaultTrainingInfo,
          participants: [],
          speakers: [],
        }),
    }),
    {
      name: 'training-details',
    }
  )
);

export default useTrainingInfoStore;
