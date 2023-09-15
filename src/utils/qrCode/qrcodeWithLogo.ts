import QRCode from 'qrcode';
import { createCanvas, loadImage } from 'canvas';
import { downloadTemplateFromGoogleDrive } from '@/services/api/google-drive-file/downloadTemplateFromGoogleDrive';
import { getFileIdFromGoogleDriveLink } from '@/utils/getFileIdFromGoogleDriveLink';

export async function createQrCodeWitLogo(
  dataForQRcode: string | QRCode.QRCodeSegment[],
  width: number,
  cwidth: number
) {
  const fileId = getFileIdFromGoogleDriveLink(
    'https://drive.google.com/file/d/1vG6o8QeIV7QAZEATRquy2FCZtUQx8fZy/view?usp=drive_link'
  );

  const logo = await downloadTemplateFromGoogleDrive(fileId!);

  // Create a canvas for QR code
  const qrCanvas = createCanvas(width, width);
  const qrContext = qrCanvas.getContext('2d');

  // Generate QR code and draw it on the QR canvas
  await QRCode.toCanvas(qrCanvas, dataForQRcode, {
    errorCorrectionLevel: 'H',
    margin: 1,
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
  });

  // Create a canvas for the logo
  const logoCanvas = createCanvas(cwidth, cwidth);
  const logoContext = logoCanvas.getContext('2d');

  // Load the logo and draw it on the logo canvas
  const img = await loadImage(logo);
  logoContext.drawImage(img, 0, 0, cwidth, cwidth);

  // Calculate the position to center the logo over the QR code
  const center = (width - cwidth) / 2;

  // Create a new canvas to merge QR code and logo
  const finalCanvas = createCanvas(width, width);
  const finalContext = finalCanvas.getContext('2d');

  // Draw QR code on the final canvas
  finalContext.drawImage(qrCanvas, 0, 0);

  // Draw the logo on top with a transparent window
  finalContext.globalCompositeOperation = 'destination-out';
  finalContext.drawImage(logoCanvas, center, center);

  return finalCanvas.toDataURL('image/png');
}
