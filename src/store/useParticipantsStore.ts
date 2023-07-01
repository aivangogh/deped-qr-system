import { ParticipantDetailsT } from '@/types/types';
import { create } from 'zustand';

type ParticipantsT = {
  participants: ParticipantDetailsT[];
  setParticipants: (participants: ParticipantDetailsT[]) => void;
  addParticipant: (participant: ParticipantDetailsT[]) => void;
};

const useParticipantsStore = create<ParticipantsT>((set) => ({
  participants: [],
  setParticipants: (participants: ParticipantDetailsT[]) =>
    set({ participants }),
  addParticipant: (participant: any) =>
    set((state) => ({
      participants: [...state.participants, participant],
    })),
}));

export default useParticipantsStore;