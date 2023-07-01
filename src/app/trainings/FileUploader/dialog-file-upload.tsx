'use client';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { FileSpreadsheet } from 'lucide-react';
import ExcelToJson from './ExcelToJson';
import { parseExcelToJson } from '../../../utils/parseExcelToJson';
import prettierJson from '@/utils/prettierJson';
import useTrainingInfoStore from '@/store/useTrainingInfoStore';
import useParticipantsStore from '@/store/useParticipantsStore';
import { useState } from 'react';
import { TrainingInfoT } from '@/types/types';

export function DialogFileUpload() {
  const [formattedJsonData, setFormattedJsonData] =
    useState<TrainingInfoT | null>(null);

  const setTrainingInfo = useTrainingInfoStore(
    (state) => state.setTrainingInfo
  );
  const setParticipants = useParticipantsStore(
    (state) => state.setParticipants
  );

  const handleFileUpload = async (file: File) => {
    try {
      const data = await parseExcelToJson(file);
      setFormattedJsonData(prettierJson(data));
    } catch (error) {
      console.error('Error parsing Excel:', error);
    }
  };

  const handleSetTrainingInfo = () => {
    // setTrainingInfo(formattedJsonData?.training!);
    setParticipants(formattedJsonData?.participants!);

    console.log(formattedJsonData?.training!);
    console.log(formattedJsonData?.participants!);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" className="ml-auto hidden h-8 lg:flex">
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Import Excel
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Import Excel File</AlertDialogTitle>
          <AlertDialogDescription>
            Import an Excel file to add new data to the table.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-4">
          <ExcelToJson onFileUpload={handleFileUpload} />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleSetTrainingInfo()}>
            Import File
          </AlertDialogAction>
        </AlertDialogFooter>

        {/* {jsonData && (
          <div>
            <h2>Parsed JSON:</h2>
            <pre>{JSON.stringify(jsonData, null, 2)}</pre>
          </div>
        )} */}
      </AlertDialogContent>
    </AlertDialog>
  );
}
