import sendBulkCertificatesViaEmail from '@/services/handlers/generate/participants/sendBulkCertificatesViaEmail';
import sendBulkCertificatesViaEmailForSpeakers from '@/services/handlers/generate/speakers/sendBulkCertificatesViaEmailForSpeakers';
import methodNaHandler from '@/services/handlers/methodNaHandler';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      return sendBulkCertificatesViaEmailForSpeakers(req, res);
    default:
      return methodNaHandler(req, res);
  }
}
