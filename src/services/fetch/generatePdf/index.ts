import {
  GenerateCertificatesRequestForParticipant,
  GenerateCertificatesRequestForParticipants,
  GenerateCertificatesRequestForSpeaker,
  GenerateCertificatesRequestForSpeakers,
} from '@/types/generate-pdf';

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

export async function generateBulkCertificatesForParticipants(
  requestData: GenerateCertificatesRequestForParticipants
): Promise<Blob> {
  console.log(requestData);

  const response = await fetch('/api/generate/participants', {
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
