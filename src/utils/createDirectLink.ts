export function createGoogleDriveDirectDownloadLink(fileLink: string): string {
  const fileIdRegex = /\/d\/([a-zA-Z0-9_-]+)/;
  const match = fileIdRegex.exec(fileLink);
  if (match && match[1]) {
    const fileId = match[1];
    const baseUrl = 'https://drive.google.com/uc?export=download';
    const link = `${baseUrl}&id=${fileId}`;
    return link;
  }
  throw new Error('Invalid Google Drive file link');
}

