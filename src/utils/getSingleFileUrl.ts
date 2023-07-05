export function getSingleFileUrl(
  res: { fileUrl: string; fileKey: string }[] | undefined
): string | null {
  if (res?.length === 1) {
    return res[0].fileUrl;
  }
  return null;
}
