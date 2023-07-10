import { drive_v3, google } from 'googleapis';
import stream from 'stream';
import fs from 'fs';

export async function uploadFileDocx(
  file: File,
  folderId: string
): Promise<string> {
  console.log(file);

  try {
    const credentials = {
      type: process.env.GOOGLE_TYPE!,
      project_id: process.env.GOOGLE_PROJECT_ID!,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID!,
      private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL!,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      auth_uri: process.env.GOOGLE_AUTH_URI!,
      token_uri: process.env.GOOGLE_TOKEN_URI!,
      auth_provider_x509_cert_url:
        process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL!,
      client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL!,
      universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN!,
    };

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    const drive = google.drive({ version: 'v3', auth });

    const fileMetadata: drive_v3.Schema$File = {
      name: 'test.docx', // Set the desired name for the file
      parents: [folderId],
    };

    const media = {
      mimeType:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      body: file,
    };

    const { data } = await drive.files.create({
      requestBody: fileMetadata,
      media,
    });

    console.log(data);

    return data.driveId!;
  } catch (error: any) {
    console.error('Failed to upload file to Google Drive:', error);
    throw error;
  }
}
