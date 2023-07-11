import { downloadTemplateFromGoogleDrive } from '@/services/api/google-drive-file/downloadTemplateFromGoogleDrive';
import { ParticipantDetailsT, TrainingDetailsT } from '@/types/types';
import { getFileIdFromGoogleDriveLink } from '@/utils/getFileIdFromGoogleDriveLink';
import { NextApiRequest, NextApiResponse } from 'next';
import QRCode from 'qrcode';
import createReport from 'docx-templates';
import archiver from 'archiver';
import { Readable } from 'stream';

export default async function generateBulkCertificates(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url, participants, trainingData } = req.body as {
    url: string;
    participants: ParticipantDetailsT[];
    trainingData: TrainingDetailsT;
  };

  const fileId = getFileIdFromGoogleDriveLink(url);

  console.log(fileId);

  const templateBuffer = await downloadTemplateFromGoogleDrive(fileId!);

  const certificates: { fileName: string; buffer: Buffer }[] = [];

  try {
    // Generate individual certificates and store them in memory
    for (const participant of participants) {
      const additionalJsContext = {
        qrCode: async () => {
          const qrCodeData = `Title of training: ${trainingData.title}\nParticipant: ${participant.participant}\nSchool: ${participant.school}\nPosition: ${participant.position}`;
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
          title_of_training: trainingData.title,
        },
        additionalJsContext,
      });

      const fileName = `${participant.participant.toLocaleLowerCase()}-certificate.docx`;

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
