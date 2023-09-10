import { TrainingT } from '@/types/training';
import { Training } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TrainingsDetailsT = {
  trainings: TrainingT[];
  setTrainings: (trainings: TrainingT[]) => void;
  removeTraining: (trainingCode: string) => void;
};

const useTrainingsStore = create<TrainingsDetailsT>()(
  persist(
    (set) => ({
      trainings: [],
      setTrainings: (trainings) => set({ trainings }),
      removeTraining: (trainingCode) =>
        set((state) => ({
          trainings: state.trainings.filter(
            (training) => training.trainingCode !== trainingCode
          ),
        })),
    }),
    {
      name: 'trainings',
    }
  )
);

export default useTrainingsStore;
