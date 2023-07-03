import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ExcelTemplateT = {
  excelUrl: string;
};

type SettingsT = {
  excelUrl: string;
  setExcelTemplate: (excelUrl: string) => void;
  resetTemplate: () => void;
};

const defaultSettings = {
  excelUrl:
    'https://docs.google.com/spreadsheets/d/1vZsa6pFv6oCnsTnOoZp_Pnft1l8pyR51/edit?usp=drive_link&ouid=111981708478442355980&rtpof=true&sd=true',
};

const useSettingsStore = create<SettingsT>()(
  persist(
    (set) => ({
      excelUrl: defaultSettings.excelUrl,
      setExcelTemplate: (excelUrl) => set({ excelUrl }),
      resetTemplate: () => set({ excelUrl: defaultSettings.excelUrl }),
    }),
    { name: 'settings' }
  )
);

export default useSettingsStore;
