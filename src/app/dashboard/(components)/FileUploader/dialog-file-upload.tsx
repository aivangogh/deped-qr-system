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
import { toast } from '@/components/ui/use-toast';
import { importXlsxFile } from '@/services/fetch/import-xlsx-file';
import useTrainingStore from '@/store/useTrainingStore';
import { ReloadIcon } from '@radix-ui/react-icons';
import { FileSpreadsheet } from 'lucide-react';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import ExcelToJson from './ExcelToJson';

export function DialogFileUpload() {
  const { training } = useTrainingStore();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const importMutation = useMutation({
    mutationKey: ['mutate-training'],
    mutationFn: (trainingCode: string) => {
      return importXlsxFile(trainingCode, uploadedFile!);
    },
    onSuccess({ data }) {
      setIsUploading(false);
      setIsDialogOpen(false);

      // Trigger a refetch of the training data (assuming you have a query for it)
      queryClient.invalidateQueries(['training', training.trainingCode]);

      toast({
        title: 'Training imported successfully',
        description: 'Training was imported successfully.',
      });
    },
    onError() {
      importMutation.reset();
      toast({
        title: 'Something went wrong',
        description: 'Training was not created. Please try again.',
      });
    },
  });

  const handleSetTrainingInfo = async () => {
    setIsUploading(true);

    toast({
      description: "We're importing your file. Please wait",
    });

    importMutation.mutate(training.trainingCode);
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="secondary" className="ml-auto h-8">
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
          <AlertDialogCancel disabled={isUploading}>Cancel</AlertDialogCancel>

          <Button onClick={handleSetTrainingInfo} disabled={isUploading}>
            {isUploading ? (
              <>
                <ReloadIcon className="animate-spin mr-2 h-4 w-4" />
                Importing...
              </>
            ) : (
              'Import File'
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
