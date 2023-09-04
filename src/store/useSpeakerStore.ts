import { Speaker } from '@prisma/client';
import { create } from 'zustand';

type SpeakersT = {
  speakers: Speaker[];
  setSpeakers: (speakers: Speaker[]) => void;
};

const useSpeakerStore = create<SpeakersT>((set) => ({
  speakers: [],
  setSpeakers: (speakers) => set({ speakers }),
}));

export default useSpeakerStore;
