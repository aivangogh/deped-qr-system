import { TrainingsT } from '@/types/trainings';
import { Training } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TrainingDetailsT = {
  training: TrainingsT;
  setTraining: (training: TrainingsT) => void;
  resetTraining: () => void;
};

const useTrainingStore = create<TrainingDetailsT>((set) => ({
  training: {
    title: '',
    amount: 0,
    year: 2023,
    trainingCode: '',
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
  setTraining: (training) => set({ training }),
  resetTraining: () =>
    set({
      training: {
        title: '',
        amount: 0,
        year: 2023,
        trainingCode: '',
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
    }),
}));

export default useTrainingStore;
