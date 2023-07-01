import { TrainingDetailsT } from '@/types/types';
import { create } from 'zustand';

type TrainingInfoT = {
  trainingInfo: TrainingDetailsT;
  setTrainingInfo: (trainingInfo: TrainingDetailsT) => void;
};

const useTrainingInfoStore = create<TrainingInfoT>((set) => ({
  trainingInfo: {
    trainingId: '',
    title: '',
    date: {
      start: new Date(),
      end: new Date(),
    },
    hours: 0,
    programHolder: '',
  },
  setTrainingInfo: (trainingInfo: any) => set({ trainingInfo }),
}));

export default useTrainingInfoStore;
