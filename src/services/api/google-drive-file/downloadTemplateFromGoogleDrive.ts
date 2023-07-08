import { google } from 'googleapis';

export async function downloadTemplateFromGoogleDrive(
  fileId: string,
  keyFilePath: string
): Promise<Buffer> {
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
