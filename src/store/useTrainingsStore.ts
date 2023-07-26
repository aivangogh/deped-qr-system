import { TrainingT } from '@/types/training';
import { Training } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TrainingsDetailsT = {
  trainings: TrainingT[];
  setTrainings: (trainings: TrainingT[]) => void;
};

const useTrainingsStore = create<TrainingsDetailsT>()(
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

export default useTrainingsStore;
