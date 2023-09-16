import { downloadTemplateFromGoogleDrive } from '@/services/api/google-drive-file/downloadTemplateFromGoogleDrive';
import { GenerateCertificatesRequestForSpeakers } from '@/types/generate-pdf';
import {
  formatDatesToDateRange,
  generateDayLabel,
  generateMonthYearLabel,
} from '@/utils/formatDates';
import { getFileIdFromGoogleDriveLink } from '@/utils/getFileIdFromGoogleDriveLink';
import { createQrCodeWitLogo } from '@/utils/qrCode/qrcodeWithLogo';
import archiver from 'archiver';
import createReport from 'docx-templates';
import { NextApiRequest, NextApiResponse } from 'next';
import QRCode from 'qrcode';

export default async function generateBulkCertificatesForSpeakersHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url, speakers, training } =
    req.body as GenerateCertificatesRequestForSpeakers;

  const fileId = getFileIdFromGoogleDriveLink(url);

  console.log(fileId);

  const templateBuffer = await downloadTemplateFromGoogleDrive(fileId!);

  const certificates: { fileName: string; buffer: Buffer }[] = [];

  try {
    // Generate individual certificates and store them in memory
    for (const speaker of speakers) {
      const additionalJsContext = {
        qrCode: async () => {
          const qrCodeData = `Title of training: ${training.title}\nSpeaker: ${speaker.speaker}\nRole: ${speaker.role}`;
          const qrCodeImage = await QRCode.toDataURL(qrCodeData);
          const data = qrCodeImage?.slice('data:image/png;base64,'.length);
          return { width: 3, height: 3, data, extension: '.png' };
        },
      };

      console.log(training);

      const buffer = await createReport({
        template: templateBuffer,
        cmdDelimiter: ['{', '}'],
        data: {
          name_of_speaker: speaker.speaker,
          role: speaker.role,
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

      const fileName = `${speaker.speaker?.toLocaleLowerCase()}-certificate.docx`;

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
