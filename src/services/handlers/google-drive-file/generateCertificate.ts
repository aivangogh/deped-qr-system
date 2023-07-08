import { downloadTemplateFromGoogleDrive } from '@/services/api/google-drive-file/downloadTemplateFromGoogleDrive';
import { ParticipantDetailsT, TrainingDetailsT } from '@/types/types';
import { getFileIdFromGoogleDriveLink } from '@/utils/getFileIdFromGoogleDriveLink';
import { writeFileSync } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import QRCode from 'qrcode';
import createReport from 'docx-templates';

interface ImageOptions {
  getImage(tag: string): Buffer | ArrayBuffer | null;
  getSize(): number[];
}

export default async function generateCertificate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url, participantData, trainingData } = req.body as {
    url: string;
    participantData: ParticipantDetailsT;
    trainingData: TrainingDetailsT;
  };

  const fileId = getFileIdFromGoogleDriveLink(url!);

  console.log(fileId);

  const templateBuffer = await downloadTemplateFromGoogleDrive(fileId!, process.env.CREDENTIALS_PATH!);

  const additionalJsContext = {
    qrCode: async () => {
      const qrCodeData = JSON.stringify({
        training: trainingData.title,
        participant: participantData.participant,
        position: participantData.position,
        school_name: participantData.school,
      });
      const qrCodeImage = await QRCode.toDataURL(qrCodeData);
      const data = qrCodeImage.slice('data:image/png;base64,'.length);
      return { width: 3, height: 3, data, extension: '.png' };
    },
  };

  const buffer = await createReport({
    template: templateBuffer,
    cmdDelimiter: ['{', '}'],
    data: {
      name_of_participant: participantData.participant,
      position: participantData.position,
      school_name: participantData.school,
      title_of_training: trainingData.title,
    },
    additionalJsContext,
  });

  const outputFile = './src/auth/generated_certificate.docx';
  writeFileSync(outputFile, buffer);

  res.json({ certificateFile: outputFile });
}
