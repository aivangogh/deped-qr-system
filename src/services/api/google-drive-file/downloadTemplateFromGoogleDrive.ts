import { google } from 'googleapis';

export async function downloadTemplateFromGoogleDrive(
  fileId: string,
  keyFilePath: string
): Promise<Buffer> {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    const drive = google.drive({ version: 'v3', auth });

    const response = await drive.files.get(
      {
        fileId: fileId,
        alt: 'media',
      },
      { responseType: 'arraybuffer' }
    );

    // Convert the response data to a buffer
    const buffer = Buffer.from(response.data as ArrayBuffer);

    return buffer;
  } catch (error: any) {
    console.error('Failed to download template from Google Drive:', error);
    throw error;
  }
}
