import { ParticipantDetailsT, TrainingDetailsT } from '@/types/types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type TrainingInfoT = {
  trainingInfo: TrainingDetailsT;
  participants: ParticipantDetailsT[];
  setTrainingInfo: (trainingInfo: TrainingDetailsT) => void;
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
};

const useTrainingInfoStore = create<TrainingInfoT>()(
  persist(
    (set) => ({
      trainingInfo: defaultTrainingInfo,
      participants: [],
      setTrainingInfo: (trainingInfo: any) => set({ trainingInfo }),
      setParticipants: (participants) =>
        set((state) => ({
          participants: participants.filter((p) => p.participant),
        })),
      resetInfo: () =>
        set({
          trainingInfo: defaultTrainingInfo,
          participants: [],
        }),
    }),
    {
      name: 'training-info',
    }
  )
);

export default useTrainingInfoStore;
