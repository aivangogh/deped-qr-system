import generateBulkCertificatesForSpeakersHandler from '@/services/handlers/generate/speakers/generateBulkCertificatesForSpeakersHandler';
import methodNaHandler from '@/services/handlers/methodNaHandler';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      return generateBulkCertificatesForSpeakersHandler(req, res);
    default:
      return methodNaHandler(req, res);
  }
}
