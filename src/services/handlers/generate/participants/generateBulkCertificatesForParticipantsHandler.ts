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
import libre from 'libreoffice-convert';
import { convertDocxToPdf } from '@/utils/convertDocxtoPdf';
import Docxtemplater from 'docxtemplater';
import { TrainingsT } from '@/types/trainings';
import { Participant } from '@prisma/client';

export default async function generateBulkCertificatesForParticipantsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url, participants, training } =
    req.body as GenerateCertificatesRequestForParticipants;
  // Create a DOCX templater instance
  const doc = new Docxtemplater();

  const fileId = getFileIdFromGoogleDriveLink(url);

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

    // console.log('zip', zip);

    // Finalize the zip file
    await zip.finalize();
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Failed to generate bulk certificates' });
  }
}

async function generateMergedCertificate(
  doc: Docxtemplater,
  participants: Participant[],
  training: TrainingsT
) {
  const mergedDocxBuffer: Buffer[] = [];

  // Generate individual certificates and add them to the merged buffer
  for (const participant of participants) {
    const additionalJsContext = {
      qrCode: async () => {
        const qrCodeData = `Title of training: ${training.title}\nParticipant: ${participant.participant}\nSchool: ${participant.school}\nPosition: ${participant.position}`;
        const qrCodeImage = await QRCode.toDataURL(qrCodeData);
        const data = qrCodeImage.slice('data:image/png;base64,'.length);
        return { width: 3, height: 3, data, extension: '.png' };
      },
    };

    // Set data for the certificate
    const data = {
      name_of_participant: participant.participant,
      position: participant.position,
      school_name: participant.school,
      title_of_training: training.title,
      venue: training.venue,
      address_of_the_venue: training.addressOfTheVenue,
      date_range: formatDatesToDateRange(training.dateFrom, training.dateTo),
      nth_day: generateDayLabel(training.issuedOn),
      month_year: generateMonthYearLabel(training.issuedOn),
    };

    // Render the certificate for the current participant
    doc.setData(data);
    doc.render();

    // Get the buffer of the rendered certificate and add it to the merged buffer
    mergedDocxBuffer.push(doc.getZip().generate({ type: 'nodebuffer' }));
  }

  // Combine individual DOCX buffers into a single DOCX file with page breaks
  const separator = Buffer.from([0x0c]); // Page break character
  const combinedBuffer = Buffer.concat([...mergedDocxBuffer, separator]);

  return combinedBuffer;
}
