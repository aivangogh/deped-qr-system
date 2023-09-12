import {
  GenerateCertificatesRequestForParticipant,
  GenerateCertificatesRequestForParticipants,
  GenerateCertificatesRequestForSpeaker,
  GenerateCertificatesRequestForSpeakers,
} from '@/types/generate-pdf';
import axios from 'axios';

export async function generateBulkCertificatesForSpeakers(
  requestData: GenerateCertificatesRequestForSpeakers
): Promise<Blob> {
  console.log(requestData);

  const response = await fetch('/api/generate/speakers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    throw new Error('Failed to generate certificate');
  }

  return response.blob();
}

export async function generateBulkCertificatesForSpeaker(
  requestData: GenerateCertificatesRequestForSpeaker
): Promise<Blob> {
  console.log(requestData);
  const response = await fetch('/api/google-drive-file/speaker', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    throw new Error('Failed to generate certificate');
  }

  return response.blob();
}

export async function sendBulkCerficatesWithEmailsForParticipants(
  requestData: GenerateCertificatesRequestForParticipants
) {
  try {
    const res = await axios.post(
      '/api/generate/participants/email',
      requestData
    );

    return res;
  } catch (err) {
    throw new Error('Failed to generate certificate');
  }
}

export async function sendBulkCerficatesWithEmailsForSpeakers(
  requestData: GenerateCertificatesRequestForSpeakers
) {
  try {
    const res = await axios.post('/api/generate/speakers/email', requestData);

    return res;
  } catch (err) {
    throw new Error('Failed to generate certificate');
  }
}

export async function generateBulkCertificatesForParticipant(
  requestData: GenerateCertificatesRequestForParticipant
): Promise<Blob> {
  console.log(requestData);
  const response = await fetch('/api/google-drive-file/participant', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    throw new Error('Failed to generate certificate');
  }

  return response.blob();
}
