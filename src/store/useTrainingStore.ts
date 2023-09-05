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
    trainingCode: '',
    dateFrom: new Date(),
    dateTo: new Date(),
    numberOfHours: 0,
    venue: '',
    addressOfTheVenue: '',
    issuedOn: new Date(),
    issuedAt: '',
    validUntil: new Date(),
    papId: '',
    pap: '',
  },
  setTraining: (training) => set({ training }),
  resetTraining: () =>
    set({
      training: {
        title: '',
        trainingCode: '',
        dateFrom: new Date(),
        dateTo: new Date(),
        numberOfHours: 0,
        venue: '',
        addressOfTheVenue: '',
        issuedOn: new Date(),
        issuedAt: '',
        validUntil: new Date(),
        papId: '',
        pap: '',
      },
    }),
}));

export default useTrainingStore;
