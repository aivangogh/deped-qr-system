import { Participant } from '@prisma/client';
import { create } from 'zustand';

type ParticipantsT = {
  participants: Participant[];
  setParticipants: (participants: Participant[]) => void;
  resetParticipants: () => void;
};

const useParticipantStore = create<ParticipantsT>((set) => ({
  participants: [],
  setParticipants: (participants) => set({ participants }),
  resetParticipants: () => set({ participants: [] }),
}));

export default useParticipantStore;
