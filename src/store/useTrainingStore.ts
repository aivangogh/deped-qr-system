import { TrainingWithoutBudgetT } from '@/types/training';
import { create } from 'zustand';

type TrainingDetailsT = {
  training: TrainingWithoutBudgetT;
  setTraining: (training: TrainingWithoutBudgetT) => void;
  resetTraining: () => void;
};

const useTrainingStore = create<TrainingDetailsT>((set) => ({
  training: {
    id: '',
    trainingCode: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: '',
    dateFrom: new Date(),
    dateTo: new Date(),
    numberOfHours: 0,
    venue: '',
    addressOfTheVenue: '',
    issuedOn: new Date(),
    issuedAt: '',
    programHolder: '',
    officeId: '',
    office: '',
  },
  setTraining: (training: TrainingWithoutBudgetT) => {
    set({ training });
  },
  resetTraining: () => {
    set({
      training: {
        id: '',
        trainingCode: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        title: '',
        dateFrom: new Date(),
        dateTo: new Date(),
        numberOfHours: 0,
        venue: '',
        addressOfTheVenue: '',
        issuedOn: new Date(),
        issuedAt: '',
        programHolder: '',
        officeId: '',
        office: '',
      },
    });
  },
}));

export default useTrainingStore;
