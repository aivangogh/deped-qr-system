import generateBulkCertificates from '@/services/handlers/generate/participants/generateBulkCertificatesHandler';
import methodNaHandler from '@/services/handlers/methodNaHandler';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      return generateBulkCertificates(req, res);
    default:
      return methodNaHandler(req, res);
  }
}
