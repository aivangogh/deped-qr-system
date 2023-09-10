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
import { generateBulkCertificatesForSpeakers } from '@/services/fetch/generatePdf';
import useSettingsStore from '@/store/useSettingsStore';
import useSpeakerStore from '@/store/useSpeakerStore';
import useTrainingStore from '@/store/useTrainingStore';
import { GenerateCertificatesRequestForSpeakers } from '@/types/generate-pdf';
import { saveAs } from 'file-saver';
import { Download, FileCheck2, FileText, RefreshCw } from 'lucide-react';
import { useCallback, useState } from 'react';

export default function DialogGenerateBulkCertificatesForSpeakers() {
  const { training } = useTrainingStore();
  const { speakers } = useSpeakerStore();
  const { documentForSpeakersUrl } = useSettingsStore();
  const [certificateURL, setCertificateURL] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleGenerateBulkCertificates = useCallback(async () => {
    try {
      setIsGenerating(true);

      const requestData: GenerateCertificatesRequestForSpeakers = {
        url: documentForSpeakersUrl,
        speakers: speakers!,
        training: training,
      };

      const blob = await generateBulkCertificatesForSpeakers(requestData);

      // Create a temporary URL for the blob
      const tempURL = URL.createObjectURL(blob);

      console.log(tempURL);
      setCertificateURL(tempURL);
    } catch (error) {
      // Handle the error
    } finally {
      setIsGenerating(false);
    }
  }, [documentForSpeakersUrl, speakers, training]);

  // Function to handle the download event for the "Download Certificate" button
  const handleDownloadCertificates = () => {
    if (certificateURL) {
      const fileName = `${training.title}-certificates-for-speaker/s.zip`;

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
            variant="secondary"
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
              Generate certificates for speaker/s in the table.
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
                  Certificates generated
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center h-40 space-y-4">
                <RefreshCw className="animate-spin" size={40} />
                <span className="text-2xl font-medium">
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
                    Download Certificates
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
