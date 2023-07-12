import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Download, FileText } from 'lucide-react';
import { ParticipantDetailsT, TrainingDetailsT } from '@/types/types';
import useTrainingInfoStore from '@/store/useTrainingInfoStore';
import { useCallback, useState } from 'react';
import useSettingsStore from '@/store/useSettingsStore';
import { saveAs } from 'file-saver';

type DialogGenerateBulkProps = {
  participants: ParticipantDetailsT[];
  trainingData: TrainingDetailsT;
};

interface GenerateCertificateRequest {
  url: string;
  participants: ParticipantDetailsT[];
  trainingData: TrainingDetailsT;
}

async function generateBulkCertificateApiRequest(
  requestData: GenerateCertificateRequest
): Promise<Blob> {
  console.log(requestData);

  const response = await fetch('/api/generate/participants', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    throw new Error('Failed to generate certificate');
  }

  return response.blob();
}

export default function DialogGenerateBulkCertificatesForParticipants() {
  const { participants, trainingInfo } = useTrainingInfoStore();
  const { documentForParticipantsUrl } = useSettingsStore();
  const [certificateURL, setCertificateURL] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleGenerateBulkCertificates = useCallback(async () => {
    try {
      setIsGenerating(true);

      const requestData: GenerateCertificateRequest = {
        url: documentForParticipantsUrl,
        participants: participants!,
        trainingData: trainingInfo,
      };

      const blob = await generateBulkCertificateApiRequest(requestData);

      // Create a temporary URL for the blob
      const tempURL = URL.createObjectURL(blob);

      console.log(tempURL);
      setCertificateURL(tempURL);
    } catch (error) {
      // Handle the error
    } finally {
      setIsGenerating(false);
    }
  }, [documentForParticipantsUrl, participants, trainingInfo]);

  // Function to handle the download event for the "Download Certificate" button
  const handleDownloadCertificates = () => {
    if (certificateURL) {
      const fileName = `${trainingInfo.title}-certificates-for-participants.zip`;

      fetch(certificateURL)
        .then((response) => response.blob())
        .then((blob) => {
          // Set the correct content type and encoding for the response
          const contentType = 'application/zip';
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
        <DialogTrigger asChild>
          <Button
            size="sm"
            className="ml-auto h-8"
            onClick={handleGenerateBulkCertificates}
          >
            <FileText className="mr-2 h-4 w-4" />
            Generate Certificates
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[475px]">
          <DialogHeader>
            <DialogTitle>Generate Certificates</DialogTitle>
            <DialogDescription>
              Generate certificates for all participants in the table.
            </DialogDescription>
          </DialogHeader>

          {certificateURL ? (
            <>
              <div className="flex items-center justify-center h-40">
                {/* <object
                  data={certificateURL}
                  type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  width="100%"
                  height="100%"
                >
                  <p>Sorry, the certificate could not be displayed.</p>
                </object> */}
                <span className="text-2xl font-medium">
                  Certificates generated
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center h-40">
                <span className="text-2xl font-medium text-muted-foreground/70">
                  Generating certificates...
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
                  <Button size="sm" onClick={handleDownloadCertificates}>
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
