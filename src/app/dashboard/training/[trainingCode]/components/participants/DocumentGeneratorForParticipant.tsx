'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Download,
  FileCheck2,
  FileText,
  MoreHorizontal,
  RefreshCw,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { generateBulkCertificatesForParticipant } from '@/services/fetch/generatePdf';
import useSettingsStore from '@/store/useSettingsStore';
import useTrainingStore from '@/store/useTrainingStore';
import { GenerateCertificatesRequestForParticipant } from '@/types/generate-pdf';
import { saveAs } from 'file-saver';
import { useCallback, useState } from 'react';
import { Participant } from '@prisma/client';

export function DocumentGeneratorForParticipant({
  participant,
}: {
  participant: Participant;
}) {
  const { training } = useTrainingStore();
  const { documentForParticipantsUrl } = useSettingsStore();
  const [certificateURL, setCertificateURL] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleGenerateCertificate = useCallback(async () => {
    try {
      setIsGenerating(true);

      const requestData: GenerateCertificatesRequestForParticipant = {
        url: documentForParticipantsUrl,
        participant: participant!,
        training: training,
      };

      const blob = await generateBulkCertificatesForParticipant(requestData);

      // Create a temporary URL for the blob
      const tempURL = URL.createObjectURL(blob);
      setCertificateURL(tempURL);
    } catch (error) {
      // Handle the error
    } finally {
      setIsGenerating(false);
    }
  }, [documentForParticipantsUrl, participant, training]);

  const handleCloseDialog = useCallback(() => {
    // Clean up the temporary URL when the dialog is closed
    if (certificateURL) {
      URL.revokeObjectURL(certificateURL);
      setCertificateURL(null);
    }
  }, [certificateURL]);

  // Function to handle the download event for the "Download Certificate" button
  const handleDownloadCertificate = () => {
    if (certificateURL) {
      const fileName = `${training.title.toLowerCase()}-certificate.docx`;

      fetch(certificateURL)
        .then((response) => response.blob())
        .then((blob) => {
          // Set the correct content type and encoding for the response
          const contentType =
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          const encoding = 'UTF-8';

          const file = new File([blob], fileName, { type: contentType });

          // Trigger the file download
          saveAs(file);
        })
        .catch((error) => {
          // Handle any errors
          console.error('Error downloading certificate:', error);
        });
    }
  };

  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <DialogTrigger
                className="flex items-center"
                onClick={handleGenerateCertificate}
              >
                <FileText className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Generate Certificate
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generated Certificate</DialogTitle>
            <DialogDescription>
              Certificate for {participant?.participant!}
            </DialogDescription>
          </DialogHeader>

          {certificateURL ? (
            <>
              <div className="flex flex-col items-center justify-center h-40 space-y-4">
                {/* <object
                  data={certificateURL}
                  type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  width="100%"
                  height="100%"
                >
                  <p>Sorry, the certificate could not be displayed.</p>
                </object> */}
                <FileCheck2 size={40} color="green" />
                <span className="text-2xl font-medium">
                  Certificate generated
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center h-40 space-y-4">
                <RefreshCw className="animate-spin" size={40} />
                <span className="text-2xl font-medium">
                  Generating certificate...
                </span>
              </div>
            </>
          )}

          <DialogFooter>
            {certificateURL && (
              <>
                <div className="flex space-x-2">
                  {/* <Button size="sm" variant="outline">
                    <RotateCcw
                      className="mr-2 h-3.5 w-3.5"
                      onClick={generateCertificate}
                    />
                    Re-generate Certificate
                  </Button> */}
                  {/* Render the "Download Certificate" button */}
                  <Button size="sm" onClick={handleDownloadCertificate}>
                    <Download className="mr-2 h-3.5 w-3.5" />
                    Download Certificate
                  </Button>
                </div>
                {/* <QRCode value={certificateFile} /> */}
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
