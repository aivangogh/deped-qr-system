import { downloadTemplateFromGoogleDrive } from '@/services/api/google-drive-file/downloadTemplateFromGoogleDrive';
import { GenerateCertificatesRequestForParticipants } from '@/types/generate-pdf';
import {
  formatDatesToDateRange,
  generateDayLabel,
  generateMonthYearLabel,
} from '@/utils/formatDates';
import { getFileIdFromGoogleDriveLink } from '@/utils/getFileIdFromGoogleDriveLink';
import archiver from 'archiver';
import createReport from 'docx-templates';
import { NextApiRequest, NextApiResponse } from 'next';
import QRCode from 'qrcode';

export default async function generateBulkCertificatesForParticipantsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url, participants, training } =
    req.body as GenerateCertificatesRequestForParticipants;

  const fileId = getFileIdFromGoogleDriveLink(url);

  console.log('TRAINING', training);

  const templateBuffer = await downloadTemplateFromGoogleDrive(fileId!);

  const certificates: { fileName: string; buffer: Buffer }[] = [];

  try {
    // Generate individual certificates and store them in memory
    for (const participant of participants) {
      const additionalJsContext = {
        qrCode: async () => {
          const qrCodeData = `Title of training: ${training.title}\nParticipant: ${participant.participant}\nSchool: ${participant.school}\nPosition: ${participant.position}`;
          const qrCodeImage = await QRCode.toDataURL(qrCodeData);
          const data = qrCodeImage.slice('data:image/png;base64,'.length);
          return { width: 3, height: 3, data, extension: '.png' };
        },
      };

      const buffer = await createReport({
        template: templateBuffer,
        cmdDelimiter: ['{', '}'],
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

      const fileName = `${participant.participant?.toLocaleLowerCase()}-certificate.docx`;

      certificates.push({ fileName, buffer: Buffer.from(buffer) });
    }

    // Create a zip file in memory
    const zip = archiver('zip', {
      zlib: { level: 9 }, // Set compression level (optional)
    });

    // Pipe the zip stream to the response
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="certificates.zip"'
    );

    zip.pipe(res);

    // Add the certificate files to the zip
    for (const certificate of certificates) {
      zip.append(certificate.buffer, { name: certificate.fileName });
    }

    console.log('zip', zip);

    // Finalize the zip file
    await zip.finalize();
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Failed to generate bulk certificates' });
  }
}
