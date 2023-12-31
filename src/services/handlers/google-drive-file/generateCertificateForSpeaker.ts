import { downloadTemplateFromGoogleDrive } from '@/services/api/google-drive-file/downloadTemplateFromGoogleDrive';
import { ParticipantDetailsT, SpeakerDetailsT, TrainingDetailsT } from '@/types/types';
import { getFileIdFromGoogleDriveLink } from '@/utils/getFileIdFromGoogleDriveLink';
import { NextApiRequest, NextApiResponse } from 'next';
import QRCode from 'qrcode';
import createReport from 'docx-templates';
import { writeFileSync } from 'fs';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';
import { Speaker } from '@prisma/client';
import { TrainingsT } from '@/types/trainings';
import { formatDatesToDateRange, generateDayLabel, generateMonthYearLabel } from '@/utils/formatDates';

export default async function generateCertificateForSpeaker(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url, speaker, training } = req.body as {
    url: string;
    speaker: Speaker;
    training: TrainingsT;
  };

  const fileId = getFileIdFromGoogleDriveLink(url!);

  console.log(fileId);

  const templateBuffer = await downloadTemplateFromGoogleDrive(fileId!);

  const additionalJsContext = {
    qrCode: async () => {
      const qrCodeData = `Title of training: ${training.title}\nSpeaker: ${speaker.speaker}`;
      const qrCodeImage = await QRCode.toDataURL(qrCodeData);
      const data = qrCodeImage.slice('data:image/png;base64,'.length);
      return { width: 3, height: 3, data, extension: '.png' };
    },
  };

  const buffer = await createReport({
    template: templateBuffer,
    cmdDelimiter: ['{', '}'],
    data: {
      name_of_speaker: speaker.speaker,
      title_of_training: training.title,
      venue: training.venue,
      address_of_the_venue: training.addressOfTheVenue,
      date_range: formatDatesToDateRange(training.dateFrom, training.dateTo),
      nth_day: generateDayLabel(training.issuedOn),
      month_year: generateMonthYearLabel(training.issuedOn),
    },
    additionalJsContext,
  });

  // writeFileSync('certificate.docx', buffer);

  const fileName = `${speaker.speaker?.toLocaleLowerCase()}-certificate.docx`; // Specify the desired file name and extension

  // Set the response headers
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  );

  // Create a readable stream from the buffer
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);

  // Pipe the stream to the response
  await pipeline(stream, res);
}
