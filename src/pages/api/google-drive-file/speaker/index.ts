import generateCertificateForSpeaker from '@/services/handlers/google-drive-file/generateCertificateForSpeaker';
import methodNaHandler from '@/services/handlers/methodNaHandler';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      return generateCertificateForSpeaker(req, res);
    default:
      return methodNaHandler(req, res);
  }
}
