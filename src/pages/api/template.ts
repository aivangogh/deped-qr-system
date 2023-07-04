// pages/api/template.ts
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const templateFilePath = path.resolve(
      './public/assets/docs/certificate-of-participants.docx'
    );
    const templateFile = fs.readFileSync(templateFilePath);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(templateFile);
  } catch (error) {
    console.error('Error fetching template file:', error);
    res.status(500).end();
  }
};
