import { Training } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TrainingDetailsT = {
  training: Training;
  setTraining: (training: Training) => void;
};

const useTrainingStore = create<TrainingDetailsT>((set) => ({
  training: {
    id: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: '',
    dateFrom: new Date(),
    dateTo: new Date(),
    numberOfHours: 0,
    venue: '',
    issuedOn: new Date(),
    issuedAt: '',
    validUntil: new Date(),
    papId: '',
  } as Training,
  setTraining: (training) => set({ training }),
}));

export default useTrainingStore;
