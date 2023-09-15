import {
  ParticipantDetailsT,
  SpeakerDetailsT,
  TrainingDetailsT,
  TrainingInfoT,
} from '@/types/types';

function excelTextToDate(excelTextDate: any): Date {
  const excelDate = Number(excelTextDate);
  if (isNaN(excelDate)) {
    throw new Error('Invalid date format');
  }

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const date = new Date((excelDate - 25569) * millisecondsPerDay);
  return date;
}

export function prettierTrainingDetails(trainingCode: string, parsedData: any) {
  const columnNames = {
    title: 0,
    dateStart: 1,
    dateEnd: 2,
    hours: 3,
  };

  const trainingDetails: TrainingDetailsT = {
    trainingCode,
    title: parsedData[columnNames.title],
    date: {
      start: excelTextToDate(parsedData[columnNames.dateStart]),
      end: excelTextToDate(parsedData[columnNames.dateEnd]),
    },
    hours: parsedData[columnNames.hours],
  };

  return trainingDetails;
}

export function prettierSpeakerDetails(trainingCode: string, parsedData: any) {
  const columnNames = {
    speakers: 0,
    role: 1,
    email: 2,
  };

  const speakers: SpeakerDetailsT[] = parsedData
    .filter((row: any) => {
      const speakerValue = row[columnNames.speakers]?.trim();
      return speakerValue !== undefined && speakerValue !== '';
    })
    .map((row: any, index: number) => ({
      speakerId: `${trainingCode}S${index + 1}`,
      speaker: row[columnNames.speakers].trim(),
      trainingCode: trainingCode,
      role: row[columnNames.role],
      email: row[columnNames.email],
    }));

  return speakers;
}

export function prettierParticipantDetails(
  trainingCode: string,
  parsedData: any
) {
  const columnNames = {
    participants: 0,
    position: 1,
    school: 2,
    contact: 3,
    email: 4,
  };

  const participants: ParticipantDetailsT[] = parsedData
    .filter((row: any) => {
      const participantValue = row[columnNames.participants]?.trim();
      return participantValue !== undefined && participantValue !== '';
    })
    .map((row: any, index: number) => ({
      participantId: `${trainingCode}P${index + 1}`,
      participant: row[columnNames.participants].trim(),
      position: row[columnNames.position],
      school: row[columnNames.school],
      contact: row[columnNames.contact],
      email: row[columnNames.email],
      trainingCode: trainingCode,
    }));

  return participants;
}

export default function prettierJsonFromExcel(
  trainingCode: string,
  trainingData: any,
  speakersData: any,
  participantsData: any
) {
  const training = prettierTrainingDetails(trainingCode, trainingData);
  const speakers = prettierSpeakerDetails(trainingCode, speakersData); // Assuming the speaker data is in the first column
  const participants = prettierParticipantDetails(
    trainingCode,
    participantsData
  ); // Starting from the row with participant data

  const formattedData: TrainingInfoT = {
    training,
    speakers,
    participants,
  };

  return formattedData;
}
