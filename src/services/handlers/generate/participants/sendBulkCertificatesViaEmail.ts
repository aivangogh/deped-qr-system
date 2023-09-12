import { downloadTemplateFromGoogleDrive } from '@/services/api/google-drive-file/downloadTemplateFromGoogleDrive';
import { GenerateCertificatesRequestForParticipants } from '@/types/generate-pdf';
import {
  formatDatesToDateRange,
  generateDayLabel,
  generateMonthYearLabel,
} from '@/utils/formatDates';
import { getFileIdFromGoogleDriveLink } from '@/utils/getFileIdFromGoogleDriveLink';
import createReport from 'docx-templates';
import { NextApiRequest, NextApiResponse } from 'next';
import QRCode from 'qrcode';
import { SendMailOptions } from 'nodemailer';
import { transporter } from '@/lib/nodemailer';

export default async function generateBulkCertificatesAndSendEmailHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url, participants, training } =
    req.body as GenerateCertificatesRequestForParticipants;

  console.log(req.body);

  const fileId = getFileIdFromGoogleDriveLink(url);

  const templateBuffer = await downloadTemplateFromGoogleDrive(fileId!);

  const certificates: { fileName: string; buffer: Buffer }[] = [];

  // Create arrays to track successful and unsuccessful email sends
  const successfulSends: string[] = [];
  const unsuccessfulSends: string[] = [];

  try {
    // Generate individual certificates and store them in memory
    for (const participant of participants) {
      if (!participant.email) {
        // Skip participants with no email address
        continue;
      }

      const additionalJsContext = {
        qrCode: async () => {
          const qrCodeData = `Title of training: ${training.title}\nParticipant: ${participant.participant}\nSchool: ${participant.school}\nPosition: ${participant.position}`;
          const qrCodeImage = await QRCode.toDataURL(qrCodeData);
          const data = qrCodeImage.slice('data:image/png;base64,'.length);
          return { width: 3, height: 3, data, extension: '.png' };
        },
      };

      const buffer = await createReport({
        template: templateBuffer,
        cmdDelimiter: ['{', '}'],
        data: {
          name_of_participant: participant.participant,
          position: participant.position,
          school_name: participant.school,
          title_of_training: training.title,
          venue: training.venue,
          address_of_the_venue: training.addressOfTheVenue,
          date_range: formatDatesToDateRange(
            training.dateFrom,
            training.dateTo
          ),
          nth_day: generateDayLabel(training.issuedOn),
          month_year: generateMonthYearLabel(training.issuedOn),
        },
        additionalJsContext,
      });

      const fileName = `${participant.participant?.toLocaleLowerCase()}-certificate.docx`;

      certificates.push({ fileName, buffer: Buffer.from(buffer) });

      // Create a transporter for sending email

      try {
        const mailOptions: SendMailOptions = {
          from: process.env.SMPT_EMAIL as string,
          to: participant.email, // Use the email address if it exists
          subject: 'Certificate for ' + participant.participant,
          text: `Dear ${participant.participant},

We take great pride in presenting to you the Certificate of Completion for the distinguished "${training.title}" program. This esteemed document signifies your exemplary commitment to academic and professional excellence.

Your successful participation and accomplishment in this rigorous training initiative exemplify your unwavering dedication, intellectual prowess, and steadfast work ethic. It is a testament to your profound understanding of the subject matter, as well as your remarkable ability to apply acquired knowledge effectively.

The "${training.title}" certificate serves not only as a recognition of your outstanding performance but also as an enduring symbol of your commitment to personal and professional development. It stands as a testament to the countless hours of scholarly engagement and the pursuit of knowledge you dedicated to this program.

May this certificate continue to inspire your pursuit of scholarly and professional growth, encouraging you to consistently aspire to the highest standards of excellence in your field. Your achievements in this training program are a testament to your academic prowess, and we have every confidence in your ability to continue making substantial contributions to your chosen field.

Congratulations on your well-deserved accomplishment. Should you require any additional documentation or further assistance, please do not hesitate to contact us.`,
          html: `<p>Dear ${participant.participant},</p>

<p>We take great pride in presenting to you the Certificate of Completion for the distinguished "<strong>${training.title}</strong>" program. This esteemed document signifies your exemplary commitment to academic and professional excellence.</p>

<p>Your successful participation and accomplishment in this rigorous training initiative exemplify your unwavering dedication, intellectual prowess, and steadfast work ethic. It is a testament to your profound understanding of the subject matter, as well as your remarkable ability to apply acquired knowledge effectively.</p>

<p>The "<strong>${training.title}</strong>" certificate serves not only as a recognition of your outstanding performance but also as an enduring symbol of your commitment to personal and professional development. It stands as a testament to the countless hours of scholarly engagement and the pursuit of knowledge you dedicated to this program.</p>

<p>May this certificate continue to inspire your pursuit of scholarly and professional growth, encouraging you to consistently aspire to the highest standards of excellence in your field. Your achievements in this training program are a testament to your academic prowess, and we have every confidence in your ability to continue making substantial contributions to your chosen field.</p>

<p>Congratulations on your well-deserved accomplishment. Should you require any additional documentation or further assistance, please do not hesitate to contact us.</p>`,
          attachments: [
            {
              filename: `${participant.participant?.toLocaleLowerCase()}-certificate.docx`,
              content: certificates.find(
                (certificate) =>
                  certificate.fileName ===
                  `${participant.participant?.toLocaleLowerCase()}-certificate.docx`
              )?.buffer,
            },
          ],
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Track successful sends
        successfulSends.push(participant.email);
      } catch (error) {
        console.error('Error sending certificate via email:', error);
        // Track unsuccessful sends
        unsuccessfulSends.push(participant.email);
      }
    }

    // Return the lists of successful and unsuccessful sends
    res.status(200).json({
      message: 'Certificates sent successfully',
      successfulSends,
      unsuccessfulSends,
    });
  } catch (error) {
    console.error('Error generating certificates:', error);
    res.status(500).json({ error: 'Failed to generate certificates' });
  }
}
