import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(
      'https://drive.google.com/uc?export=download&id=1vZsa6pFv6oCnsTnOoZp_Pnft1l8pyR51'
    );
    const data = await response.blob();
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}
