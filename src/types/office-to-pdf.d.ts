declare module 'office-to-pdf' {
  const officeToPdf: (
    input: Buffer | string,
    output?: string
  ) => Promise<Buffer>;

  export default officeToPdf;
}
