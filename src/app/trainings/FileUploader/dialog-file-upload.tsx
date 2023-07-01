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
import { useState } from 'react';
import ExcelToJson from './ExcelToJson';
import { parseExcelToJson } from './parseExcelToJson';

export function DialogFileUpload() {
  const [jsonData, setJsonData] = useState<any>(null);

  const handleFileUpload = async (file: File) => {
    try {
      const data = await parseExcelToJson(file);
      setJsonData(data);
    } catch (error) {
      console.error('Error parsing Excel:', error);
    }
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
          <Button type="submit">Import File</Button>
        </AlertDialogFooter>

        {jsonData && (
          <div>
            <h2>Parsed JSON:</h2>
            <pre>{JSON.stringify(jsonData, null, 2)}</pre>
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
