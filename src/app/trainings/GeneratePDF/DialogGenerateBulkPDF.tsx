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
import { FileText } from 'lucide-react';

export default function DialogGenerateBulkPDF() {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="secondary" size="sm" className="ml-auto h-8">
            <FileText className="mr-2 h-4 w-4" />
            Generate Certificates
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Generate Certificates</AlertDialogTitle>
            <AlertDialogDescription>
              Generate certificates for all trainees in the table to PDF file.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Generate</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
