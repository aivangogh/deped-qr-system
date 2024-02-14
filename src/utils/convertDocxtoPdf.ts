import * as officegen from 'officegen';
import Docxtemplater from 'docxtemplater';

export async function convertDocxToPdf(docxBuffer: Buffer): Promise<Buffer> {
  // Create a Docxtemplater instance with the DOCX buffer
  const doc = new Docxtemplater();
  doc.loadZip(docxBuffer);

  // Create a writable stream for the PDF
  const pdfStream = new (require('stream').PassThrough)();

  // Use officegen to generate a PDF from the DOCX template
  const pdfDoc = officegen('pdf');
  pdfDoc.on('finalize', () => {
    // Pipe the PDF document to the writable stream
    pdfDoc.pipe(pdfStream);
  });

  // Convert the DOCX template to PDF
  doc.render();
  pdfDoc.generate();

  // Convert the PDF stream to a buffer
  const pdfBuffer = await streamToBuffer(pdfStream);

  console.log(pdfBuffer);

  return pdfBuffer;
}

function streamToBuffer(stream: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: any[] = [];
    stream.on('data', (chunk: any) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', (error: any) => reject(error));
  });
}
