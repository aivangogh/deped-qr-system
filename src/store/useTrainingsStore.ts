import { TrainingsT } from '@/types/trainings';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TrainingsDetailsT = {
  trainings: TrainingsT[];
  setTrainings: (trainings: TrainingsT[]) => void;
};

const useTrainingInfoStore = create<TrainingsDetailsT>()(
  persist(
    (set) => ({
      trainings: [],
      setTrainings: (trainings) => set({ trainings }),
    }),
    {
      name: 'trainings',
    }
  )
);

export default useTrainingInfoStore;
