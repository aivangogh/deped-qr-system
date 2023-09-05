import { Speaker } from '@prisma/client';
import { create } from 'zustand';

type SpeakersT = {
  speakers: Speaker[];
  setSpeakers: (speakers: Speaker[]) => void;
  resetSpeakers: () => void;
};

const useSpeakerStore = create<SpeakersT>((set) => ({
  speakers: [],
  setSpeakers: (speakers) => set({ speakers }),
  resetSpeakers: () => set({ speakers: [] }),
}));

export default useSpeakerStore;
