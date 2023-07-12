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
  driveFolderUrl: string;
  setExcelUrl: (url: string) => void;
  setExcelDirectUrl: (directUrl: string) => void;
  setDocumentsForParticipantsUrl: (url: string) => void;
  setDocumentsForParticipantsDirectUrl: (directUrl: string) => void;
  setDocumentsForSpeakersUrl: (url: string) => void;
  setDocumentsForSpeakersDirectUrl: (directUrl: string) => void;
  setDriveFolderUrl: (driveFolderUrl: string) => void;
  resetTemplate: () => void;
};

const defaultExcelSettings = {
  url: 'https://docs.google.com/spreadsheets/d/1mjQ0Ix8WFLnSKJo_5fGTYNeR9rZIiwCn/edit?usp=sharing&ouid=117631688372439328232&rtpof=true&sd=true',
  directUrl:
    'https://drive.google.com/uc?export=download&id=1mjQ0Ix8WFLnSKJo_5fGTYNeR9rZIiwCn',
};

const defaultDocumentForParticipantsSettings = {
  url: 'https://docs.google.com/document/d/1vRa2nJmx2M9DPdOuP60a5gUrQRZBk-s1/edit?usp=drive_link&ouid=117631688372439328232&rtpof=true&sd=true',
  directUrl:
    'https://drive.google.com/uc?export=download&id=1vRa2nJmx2M9DPdOuP60a5gUrQRZBk-s1',
};

const defaultDocumentForSpeakersSettings = {
  url: 'https://docs.google.com/document/d/1_Kqj8YOZS1_itslnfPiHcuDxaDGab3vA/edit?usp=drive_link&ouid=117631688372439328232&rtpof=true&sd=true',
  directUrl:
    'https://drive.google.com/uc?export=download&id=1_Kqj8YOZS1_itslnfPiHcuDxaDGab3vA',
};

const defaultDriveFolderUrl =
  'https://drive.google.com/drive/folders/1eE0iCZcxFGCocxHDkhbTdVK0Knrf-3ue?usp=sharing';

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
      driveFolderUrl: defaultDriveFolderUrl,
      setExcelUrl: (url) => set({ excelUrl: url }),
      setExcelDirectUrl: (directUrl) => set({ excelDirectUrl: directUrl }),
      setDocumentsForParticipantsUrl: (url) =>
        set({ documentForParticipantsUrl: url }),
      setDocumentsForParticipantsDirectUrl: (directUrl) =>
        set({ documentForParticipantsDirectUrl: directUrl }),
      setDocumentsForSpeakersUrl: (url) => set({ documentForSpeakersUrl: url }),
      setDocumentsForSpeakersDirectUrl: (directUrl) =>
        set({ documentForSpeakersDirectUrl: directUrl }),
      setDriveFolderUrl: (driveFolderUrl) => set({ driveFolderUrl }),
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
