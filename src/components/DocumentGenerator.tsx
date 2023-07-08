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
import { Row } from '@tanstack/react-table';
import { Download, FileText, MoreHorizontal, RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import useTrainingInfoStore from '@/store/useTrainingInfoStore';
import { ParticipantDetailsT } from '@/types/types';

import useSettingsStore from '@/store/useSettingsStore';
import { TrainingDetailsT } from '@/types/types';
import { useCallback, useEffect, useState } from 'react';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
interface GenerateCertificateRequest {
  url: string;
  participantData: ParticipantDetailsT;
  trainingData: TrainingDetailsT;
}

interface GenerateCertificateResponse {
  certificateFile: string;
}

type CertificateGeneratorProps = {
  participant: ParticipantDetailsT;
};

async function generateCertificateApiRequest(
  requestData: GenerateCertificateRequest
): Promise<GenerateCertificateResponse> {
  console.log(requestData);
  const response = await fetch('/api/google-drive-file', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    throw new Error('Failed to generate certificate');
  }

  return response.json() as Promise<GenerateCertificateResponse>;
}

function CertificateGenerator({ participant }: CertificateGeneratorProps) {
  const { trainingInfo, setParticipant } = useTrainingInfoStore();
  const { documentForParticipantsUrl } = useSettingsStore();
  const [certificateFile, setCertificateFile] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCertificate = useCallback(async () => {
    try {
      setIsGenerating(true);

      const requestData: GenerateCertificateRequest = {
        url: documentForParticipantsUrl,
        participantData: participant,
        trainingData: trainingInfo,
      };

      const response = await generateCertificateApiRequest(requestData);

      setCertificateFile(response.certificateFile);
    } catch (error) {
      // Handle the error
    } finally {
      setIsGenerating(false);
    }
  }, [documentForParticipantsUrl, participant, trainingInfo]);

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
            <DialogTitle>Generate Certificate</DialogTitle>
            <DialogDescription>
              Generate a certificate for the participant
            </DialogDescription>
          </DialogHeader>

          {certificateFile ? (
            <>
              <div className="flex items-center justify-center h-40">
                <span className="text-2xl font-medium">
                  Certificate generated successfully
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center h-40">
                <span className="text-2xl font-medium text-muted-foreground/70">
                  Generating certificate...
                </span>
              </div>
            </>
          )}

          <DialogFooter>
            {certificateFile && (
              <>
                <div className="flex space-x-2">
                  {/* <Button size="sm" variant="outline">
                    <RotateCcw
                      className="mr-2 h-3.5 w-3.5"
                      onClick={generateCertificate}
                    />
                    Re-generate Certificate
                  </Button> */}
                  <a href={certificateFile} download>
                    <Button size="sm">
                      <Download className="mr-2 h-3.5 w-3.5" />
                      Download Certificate
                    </Button>
                  </a>
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

export default CertificateGenerator;
