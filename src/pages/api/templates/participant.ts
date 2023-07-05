import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch(
      'https://drive.google.com/uc?export=download&id=1vZsa6pFv6oCnsTnOoZp_Pnft1l8pyR51'
    );
    const file = await response.blob();

    res.setHeader(
      'Content-Disposition',
      response.headers.get('content-disposition') || ''
    );
    res.setHeader('Content-Type', response.headers.get('content-type') || '');
    res.setHeader(
      'Content-Length',
      response.headers.get('content-length') || ''
    );
    res.send(file);
  } catch (error) {
    console.error('Error proxying file:', error);
    res.status(500).end();
  }
};
