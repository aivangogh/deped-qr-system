import { Button } from '@/components/ui/button';
import { MailCheck, Send } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { generateBulkCertificatesForParticipants } from '@/services/fetch/generatePdf';
import useParticipantStore from '@/store/useParticipantStore';
import useSettingsStore from '@/store/useSettingsStore';
import useTrainingStore from '@/store/useTrainingStore';
import {
  GenerateCertificatesRequestForParticipants,
  GenerateCertificatesRequestForSpeakers,
} from '@/types/generate-pdf';
import { saveAs } from 'file-saver';
import { Download, FileCheck2, FileText, RefreshCw } from 'lucide-react';
import { useCallback, useState } from 'react';
import {
  sendBulkCerficatesWithEmailsForParticipants,
  sendBulkCerficatesWithEmailsForSpeakers,
} from '@/services/fetch/sendViaEmail';
import useSpeakerStore from '@/store/useSpeakerStore';

export default function SendViaEmailSpeakers() {
  const { training } = useTrainingStore();
  const { speakers } = useSpeakerStore();
  const { documentForSpeakersUrl } = useSettingsStore();
  const [certificateURL, setCertificateURL] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleSendBulkCertificates = useCallback(async () => {
    setIsGenerating(true);

    const requestData: GenerateCertificatesRequestForSpeakers = {
      url: documentForSpeakersUrl,
      speakers: speakers!,
      training: training,
    };

    await sendBulkCerficatesWithEmailsForSpeakers(requestData)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setIsGenerating(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [documentForSpeakersUrl, speakers, training]);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="default"
            className="ml-auto h-8"
            onClick={handleSendBulkCertificates}
          >
            <Send className="mr-2 h-4 w-4" />
            Send via email
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[475px]">
          <DialogHeader>
            <DialogTitle>Send certificate via email</DialogTitle>
            <DialogDescription>
              Send certificates for all speakers in the table.
            </DialogDescription>
          </DialogHeader>

          {isGenerating ? (
            <>
              <div className="flex flex-col items-center justify-center h-40 space-y-4">
                <RefreshCw className="animate-spin" size={40} />
                <span className="text-2xl font-medium">
                  Sending Certificates...
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center h-40 space-y-4">
                <MailCheck size={40} color="green" />
                <span className="text-2xl font-medium">
                  Certificates sent successfully!
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
                  {/* <Button size="sm" onClick={handleDownloadCertificates}>
                    <Download className="mr-2 h-3.5 w-3.5" />
                    Download Certificate
                  </Button> */}
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
