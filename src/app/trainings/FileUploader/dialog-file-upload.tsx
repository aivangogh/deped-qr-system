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
import { useState } from 'react';
import { TrainingInfoT } from '@/types/types';

export function DialogFileUpload() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [formattedJsonData, setFormattedJsonData] =
    useState<TrainingInfoT | null>(null);

  const { setTrainingInfo, setParticipants } = useTrainingInfoStore();

  const handleSetTrainingInfo = async () => {
    try {
      const data = await parseExcelToJson(uploadedFile!);
      const parsedData = prettierJson(data);

      console.log(parsedData);

      setTrainingInfo(parsedData.training);
      setParticipants(parsedData.participants);
    } catch (error) {
      console.error('Error parsing Excel:', error);
    }
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
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
          <AlertDialogAction onClick={handleSetTrainingInfo}>
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
