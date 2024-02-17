import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useParticipantStore from "@/store/useParticipantStore";
import useSettingsStore from "@/store/useSettingsStore";
import useTrainingStore from "@/store/useTrainingStore";
import { GenerateCertificatesRequestForParticipants } from "@/types/generate-pdf";
import { saveAs } from "file-saver";
import { Download, FileCheck2, FileText, RefreshCw } from "lucide-react";
import { useCallback, useState } from "react";
import generateBulkCertificatesForParticipants from "./actions";

export default function DialogGenerateBulkCertificatesForParticipants() {
  const { training } = useTrainingStore();
  const { participants } = useParticipantStore();
  const { documentForParticipantsUrl } = useSettingsStore();
  const [certificateBlob, setCertificateBlob] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleGenerateBulkCertificates = useCallback(async () => {
    try {
      setIsGenerating(true);

      const requestData: GenerateCertificatesRequestForParticipants = {
        url: documentForParticipantsUrl,
        participants: participants!,
        training: training,
      };

      const arrayBuffer = await generateBulkCertificatesForParticipants(
        requestData
      );

      if (arrayBuffer !== undefined) {
        // Convert the array back to Uint8Array before creating a Blob
        const uint8Array = new Uint8Array(arrayBuffer);
        const blob = new Blob([uint8Array], { type: "application/zip" });

        const tempURL = URL.createObjectURL(blob);
        console.log(tempURL);
        setCertificateBlob(tempURL);
      } else {
        console.error("Failed to generate certificates");
      }
    } catch (error) {
      console.error("Error generating certificates:", error);
    } finally {
      setIsGenerating(false);
    }
  }, [documentForParticipantsUrl, participants, training]);

  const handleDownloadCertificates = async () => {
    if (certificateBlob) {
      const fileName = `${training.title}-certificates-for-participants.zip`;

      try {
        console.log("Downloading certificates...");

        // Use the Blob directly
        saveAs(certificateBlob, fileName);
      } catch (error) {
        console.error("Error downloading certificate:", error);
      }
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
              Generate certificates for all participants in the table.
            </DialogDescription>
          </DialogHeader>

          {certificateBlob ? (
            <>
              <div className="flex flex-col items-center justify-center h-40 space-y-4">
                <FileCheck2 size={40} color="green" />
                <span className="text-2xl font-medium">
                  Certificates generated!
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
            {certificateBlob && (
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
