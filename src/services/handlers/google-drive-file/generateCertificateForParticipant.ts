import { downloadTemplateFromGoogleDrive } from '@/services/api/google-drive-file/downloadTemplateFromGoogleDrive';
import { ParticipantDetailsT, TrainingDetailsT } from '@/types/types';
import { getFileIdFromGoogleDriveLink } from '@/utils/getFileIdFromGoogleDriveLink';
import { NextApiRequest, NextApiResponse } from 'next';
import QRCode from 'qrcode';
import createReport from 'docx-templates';
import { writeFileSync } from 'fs';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';
import { Participant } from '@prisma/client';
import { TrainingsT } from '@/types/trainings';
import {
  formatDatesToDateRange,
  generateDayLabel,
  generateMonthYearLabel,
} from '@/utils/formatDates';

export default async function generateCertificateForParticipant(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url, participant, training } = req.body as {
    url: string;
    participant: Participant;
    training: TrainingsT;
  };

  console.log({ url, participant, training });

  const fileId = getFileIdFromGoogleDriveLink(url!);

  console.log(fileId);

  const templateBuffer = await downloadTemplateFromGoogleDrive(fileId!);

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
      name_of_participant: participant.participant!,
      position: participant.position!,
      school_name: participant.school!,
      title_of_training: training.title!,
      venue: training.venue!,
      address_of_the_venue: training.addressOfTheVenue!,
      date_range: formatDatesToDateRange(training.dateFrom, training.dateTo),
      nth_day: generateDayLabel(training.issuedOn),
      month_year: generateMonthYearLabel(training.issuedOn),
    },
    additionalJsContext,
  });

  const fileName = `${participant.participant?.toLocaleLowerCase()}-certificate.docx`; // Specify the desired file name and extension

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
