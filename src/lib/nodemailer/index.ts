import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: 'rex.dacanay@deped.gov.ph',
    clientId:
      '994009986195-9k7ojgpk2v93bf25ht5s71vge8g4kvm7.apps.googleusercontent.com',
    clientSecret: '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',
    refreshToken:
      '1//043tckyka06WWCgYIARAAGAQSNwF-L9Ir8lIT3TOa2kknIR3nO_mpKBkFNBMelTQnJnhRTitIaEqTUGxui9K4mIyCWqCEqUEV2a4',
    accessToken:
      'ya29.a0AfB_byB3EtwkOChtGfEHjDBtZWLs585rG2qjF5BaFvTryobwUlh_jZ3c7aMfZTvkjhjDor8Ljf_nTpaPK1uZMwmok89syVPZSFMjaxto0i7jhz9Dn7TSLFIXfMEcDRQTRbcwDvaU2tvbQshJW68aVESdhDSpE1wmVQaCgYKAYUSARISFQGOcNnCeqcacf8BKpKiNfTbR08wIw0169',
    expires: 1484314697598,
  },
});

// export const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'rex.dacanay@deped.gov.ph',
//     pass: 'changeme',
//   },
// });

export const mailOptions = {
  from: process.env.SMPT_EMAIL as string,
};
