import { NextApiRequest, NextApiResponse } from 'next';
import { readFileSync, writeFileSync } from 'fs';
import Docxtemplater from 'docxtemplater';
import QRCode from 'qrcode';
import { google, drive_v3 } from 'googleapis';

import { Readable } from 'stream';
import buffer from 'get-stream';

// Example API route handler for generating a certificate
export default async function generateCertificate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { participantName, trainingData } = req.body;

  // Load the template from Google Drive
  const templateContent = await downloadTemplateFromGoogleDrive(
    '1vZsa6pFv6oCnsTnOoZp_Pnft1l8pyR51  '
  );

  // Create a new Docxtemplater instance and load the template
  const doc = new Docxtemplater();
  doc.loadZip(templateContent);

  // Set the data for template substitution
  doc.setData({ participantName, trainingData });

  // Render the document with the provided data
  doc.render();

  // Generate a QR code with participant data
  const qrCodeData = JSON.stringify({ participantName, trainingData });
  const qrCodeImage = await QRCode.toDataURL(qrCodeData);

  // Get the XML representation of the document's body
  const bodyXml = doc.getZip().file('word/document.xml').asText();

  // Replace the QR code placeholder with the QR code image tag
  const qrCodePlaceholder = '{qrCodePlaceholder}'; // Replace with your actual placeholder
  const updatedBodyXml = bodyXml.replace(qrCodePlaceholder, qrCodeImage);

  // Update the document with the modified body XML
  doc.getZip().file('word/document.xml', updatedBodyXml);

  // Save the modified document
  const generatedDocument = doc.getZip().generate({ type: 'nodebuffer' });
  const outputFile = 'path/to/generated_certificate.docx';
  writeFileSync(outputFile, generatedDocument);

  // Return the generated certificate file path or provide a download link
  res.json({ certificateFile: outputFile });
}

async function downloadTemplateFromGoogleDrive(
  fileId: string
): Promise<Buffer> {
  const auth = new google.auth.GoogleAuth({
    // Configure your Google Drive API credentials here
    keyFile: './src/auth/credentials.json',
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  const drive = google.drive({ version: 'v3', auth });

  try {
    const response = await drive.files.export(
      {
        fileId,
        mimeType:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      },
      { responseType: 'stream' }
    );

    const bufferData = await buffer(response.data as Readable);
    return Buffer.from(bufferData);
  } catch (error) {
    console.error('Failed to download template from Google Drive:', error);
    // Handle the error appropriately
    throw error;
  }
}
