'use client';

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
import { Button } from '@/components/ui/button';
import useTrainingInfoStore from '@/store/useTrainingInfoStore';
import { TrainingInfoT } from '@/types/types';
import prettierJson from '@/utils/prettierJsonFromExcel';
import { FileSpreadsheet } from 'lucide-react';
import { useState } from 'react';
import { parseExcelToJson } from '../../../../utils/parseExcelToJson';
import ExcelToJson from './ExcelToJson';
import { importXlsxFile } from '@/services/fetch/import-xlsx-file';

export function DialogFileUpload() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [formattedJsonData, setFormattedJsonData] =
    useState<TrainingInfoT | null>(null);

  const { setTrainingInfo, setParticipants, setSpeakers } =
    useTrainingInfoStore();

  const handleSetTrainingInfo = async () => {
    try {
      const data = await importXlsxFile(uploadedFile!);
      // const parsedData = prettierJson(data);

      console.log(data);

      setTrainingInfo(data.training);
      setSpeakers(data.speaker);
      setParticipants(data.participants);
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
        <Button size="sm" variant="secondary" className="ml-auto h-8">
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
