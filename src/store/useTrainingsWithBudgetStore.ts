import { TrainingWithBudgetT } from '@/types/training';
import { create } from 'zustand';

type TrainingsWithBudgetT = {
  trainingsWithBudget: TrainingWithBudgetT[];
  setTrainingsWithBudget: (trainingsWithBudget: TrainingWithBudgetT[]) => void;
  removeTrainingWithBudget: (trainingCode: string) => void;
};

const useTrainingsWithBudgetStore = create<TrainingsWithBudgetT>((set) => ({
  trainingsWithBudget: [],
  setTrainingsWithBudget: (trainingsWithBudget) => set({ trainingsWithBudget }),
  removeTrainingWithBudget: (trainingCode) =>
    set((state) => ({
      trainingsWithBudget: state.trainingsWithBudget.filter(
        (training) => training.trainingCode !== trainingCode
      ),
    })),
}));

export default useTrainingsWithBudgetStore;
