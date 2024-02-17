
import { downloadTemplateFromGoogleDrive } from "@/services/api/google-drive-file/downloadTemplateFromGoogleDrive";
import { GenerateCertificatesRequestForParticipants } from "@/types/generate-pdf";
import {
  formatDatesToDateRange,
  generateDayLabel,
  generateMonthYearLabel,
} from "@/utils/formatDates";
import { getFileIdFromGoogleDriveLink } from "@/utils/getFileIdFromGoogleDriveLink";
import archiver from "archiver";
import createReport from "docx-templates";
import Docxtemplater from "docxtemplater";
import QRCode from "qrcode";
import JSZip from "jszip";

export default async function generateBulkCertificatesForParticipants({
  url,
  participants,
  training,
}: GenerateCertificatesRequestForParticipants): Promise<number[] | undefined> {
  console.log("Generating certificates...");

  //   const { url, participants, training } =
  //     req.body as GenerateCertificatesRequestForParticipants;
  // Create a DOCX templater instance
  const doc = new Docxtemplater();

  const fileId = getFileIdFromGoogleDriveLink(url);

  const templateBuffer = await downloadTemplateFromGoogleDrive(fileId!);

  const certificates: { fileName: string; buffer: Buffer }[] = [];
  const zip = new JSZip();

  try {
    console.log("Generating individual certificates...");

    // Generate individual certificates and store them in memory
    for (const participant of participants) {
      const additionalJsContext = {
        qrCode: async () => {
          const qrCodeData = `Title of training: ${training.title}\nParticipant: ${participant.participant}\nSchool: ${participant.school}\nPosition: ${participant.position}`;
          const qrCodeImage = await QRCode.toDataURL(qrCodeData);
          const data = qrCodeImage.slice("data:image/png;base64,".length);
          return { width: 3, height: 3, data, extension: ".png" };
        },
      };

      const buffer = await createReport({
        template: templateBuffer,
        cmdDelimiter: ["{", "}"],
        data: {
          name_of_participant: participant.participant,
          position: participant.position,
          school_name: participant.school,
          title_of_training: training.title,
          venue: training.venue,
          address_of_the_venue: training.addressOfTheVenue,
          date_range: formatDatesToDateRange(
            training.dateFrom,
            training.dateTo
          ),
          nth_day: generateDayLabel(training.issuedOn),
          month_year: generateMonthYearLabel(training.issuedOn),
        },
        additionalJsContext,
      });
      // Log specific data points or objects
      console.log("Training title:", training.title);
      console.log("Participant data:", participant);

      const fileName = `${participant.participant?.toLocaleLowerCase()}-certificate.docx`;

      zip.file(fileName, buffer);
      // certificates.push({ fileName, buffer: Buffer.from(buffer) });
    }

    // Generate a blob from the zip
    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

    // Convert the raw buffer to a regular array before returning
    const zipArray = Array.from(new Uint8Array(zipBuffer));

    console.log("Certificates generated successfully");

    return zipArray;
  } catch (error) {
    console.error("Error generating certificates:", error);
    throw error;
  }
}
