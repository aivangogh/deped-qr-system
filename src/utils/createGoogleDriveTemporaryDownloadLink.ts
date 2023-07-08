import { google } from 'googleapis';
import { getFileIdFromGoogleDriveLink } from './getFileIdFromGoogleDriveLink';

export async function createGoogleDriveTemporaryDownloadLink(
  driveLink: string
): Promise<string> {
  console.log("Temporary Link 1")
  const auth = new google.auth.GoogleAuth({
    // Specify your API credentials or token here
    // For example, using a service account key file:
    keyFile: './@/auth/credentials.json',
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  const drive = google.drive({ version: 'v3', auth });

  const { data } = await drive.files.get({
    fileId: getFileIdFromGoogleDriveLink(driveLink)!,
    fields: 'webViewLink',
  });

  return data.webViewLink!;
}
