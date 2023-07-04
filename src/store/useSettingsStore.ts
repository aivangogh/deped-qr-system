import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ExcelTemplateT = {
  url: string;
  directUrl: string;
};

type SettingsT = {
  excelUrl: string;
  excelDirectUrl: string;
  documentForParticipantsUrl: string;
  documentForParticipantsDirectUrl: string;
  documentForSpeakersUrl: string;
  documentForSpeakersDirectUrl: string;
  setExcelUrl: (url: string) => void;
  setExcelDirectUrl: (directUrl: string) => void;
  setDocumentsForParticipantsUrl: (url: string) => void;
  setDocumentsForParticipantsDirectUrl: (directUrl: string) => void;
  setDocumentsForSpeakersUrl: (url: string) => void;
  setDocumentsForSpeakersDirectUrl: (directUrl: string) => void;
  resetTemplate: () => void;
};

const defaultExcelSettings = {
  url: 'https://docs.google.com/spreadsheets/d/1vZsa6pFv6oCnsTnOoZp_Pnft1l8pyR51/edit?usp=drive_link&ouid=111981708478442355980&rtpof=true&sd=true',
  directUrl:
    'https://drive.google.com/uc?export=download&id=1vZsa6pFv6oCnsTnOoZp_Pnft1l8pyR51',
};

const defaultDocumentForParticipantsSettings = {
  url: 'https://docs.google.com/document/d/1iWsko4Z87K6n8KJRwT7QE5gHYN37rh0B/edit?usp=drive_link&ouid=111981708478442355980&rtpof=true&sd=true',
  directUrl:
    'https://drive.google.com/uc?export=download&id=1iWsko4Z87K6n8KJRwT7QE5gHYN37rh0B',
};

const defaultDocumentForSpeakersSettings = {
  url: 'https://docs.google.com/document/d/1UqJgCCuoDoH1cPkEJJCUw3iP2DWVSrIE/edit?usp=drive_link&ouid=111981708478442355980&rtpof=true&sd=true',
  directUrl:
    'https://drive.google.com/uc?export=download&id=1UqJgCCuoDoH1cPkEJJCUw3iP2DWVSrIE',
};

const useSettingsStore = create<SettingsT>()(
  persist(
    (set) => ({
      excelUrl: defaultExcelSettings.url,
      excelDirectUrl: defaultExcelSettings.directUrl,
      documentForParticipantsUrl: defaultDocumentForParticipantsSettings.url,
      documentForParticipantsDirectUrl:
        defaultDocumentForParticipantsSettings.directUrl,
      documentForSpeakersUrl: defaultDocumentForSpeakersSettings.url,
      documentForSpeakersDirectUrl:
        defaultDocumentForSpeakersSettings.directUrl,
      setExcelUrl: (url) => set({ excelUrl: url }),
      setExcelDirectUrl: (directUrl) => set({ excelDirectUrl: directUrl }),
      setDocumentsForParticipantsUrl: (url) =>
        set({ documentForParticipantsUrl: url }),
      setDocumentsForParticipantsDirectUrl: (directUrl) =>
        set({ documentForParticipantsDirectUrl: directUrl }),
      setDocumentsForSpeakersUrl: (url) => set({ documentForSpeakersUrl: url }),
      setDocumentsForSpeakersDirectUrl: (directUrl) =>
        set({ documentForSpeakersDirectUrl: directUrl }),
      resetTemplate: () =>
        set({
          excelUrl: defaultExcelSettings.url,
          excelDirectUrl: defaultExcelSettings.directUrl,
          documentForParticipantsUrl:
            defaultDocumentForParticipantsSettings.url,
          documentForParticipantsDirectUrl:
            defaultDocumentForParticipantsSettings.directUrl,
          documentForSpeakersUrl: defaultDocumentForSpeakersSettings.url,
          documentForSpeakersDirectUrl:
            defaultDocumentForSpeakersSettings.directUrl,
        }),
    }),
    { name: 'settings' }
  )
);

export default useSettingsStore;
