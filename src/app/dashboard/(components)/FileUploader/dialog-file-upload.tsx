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
import { importXlsxFile } from '@/services/fetch/import-xlsx-file';
import useParticipantStore from '@/store/useParticipantStore';
import useSpeakerStore from '@/store/useSpeakerStore';
import useTrainingStore from '@/store/useTrainingStore';
import { TrainingInfoT } from '@/types/types';
import { FileSpreadsheet } from 'lucide-react';
import { useState } from 'react';
import ExcelToJson from './ExcelToJson';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from '@/components/ui/use-toast';

export function DialogFileUpload() {
  const { training } = useTrainingStore();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [formattedJsonData, setFormattedJsonData] =
    useState<TrainingInfoT | null>(null);
  const { setTraining } = useTrainingStore();
  const { setParticipants } = useParticipantStore();
  const { setSpeakers } = useSpeakerStore();
  const [isUploading, setIsUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const importMutation = useMutation({
    mutationKey: ['training'],
    mutationFn: (trainingCode: string) => {
      return importXlsxFile(trainingCode, uploadedFile!);
    },
    onSuccess({ data }) {
      console.log(data);

      setIsUploading(false);
      console.log(data);
      // setTraining(data.training);
      setSpeakers(data.speaker!);
      setParticipants(data.participants!);

      toast({
        title: 'Training imported successfully',
        description: 'Training was imported successfully.',
      });

      // router.refresh();
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
      title: 'Importing...',
    });

    importMutation.mutate(training.trainingCode);
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
  };

  return (
    <AlertDialog>
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
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
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
