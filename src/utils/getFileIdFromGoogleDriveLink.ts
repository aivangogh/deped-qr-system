
export function getFileIdFromGoogleDriveLink(link: string) {
  const fileIdRegex = /\/d\/([a-zA-Z0-9_-]+)/;
  const match = fileIdRegex.exec(link);
  if (match && match[1]) {
    return match[1];
  }
}