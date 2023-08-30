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

export function prettierTrainingDetails(parsedData: any) {
  const columnNames = {
    title: 0,
    dateStart: 1,
    dateEnd: 2,
    hours: 3,
  };

  const trainingDetails: TrainingDetailsT = {
    trainingId: 'T00001',
    title: parsedData[columnNames.title],
    date: {
      start: excelTextToDate(parsedData[columnNames.dateStart]),
      end: excelTextToDate(parsedData[columnNames.dateEnd]),
    },
    hours: parsedData[columnNames.hours],
  };

  return trainingDetails;
}

export function prettierSpeakerDetails(speakers: any) {
  const columnNames = {
    speaker: 0,
  };

  let speakerDetails: SpeakerDetailsT[] = [];
  if (Array.isArray(speakers)) {
    speakerDetails = speakers.map((speaker: any) => ({
      speakerId: 'T00001S1',
      speaker,
    }));
  } else if (typeof speakers === 'string') {
    speakerDetails = [{ speakerId: 'T00001S1', speaker: speakers }];
  }

  return speakerDetails;
}

export function prettierParticipantDetails(parsedData: any) {
  const columnNames = {
    participants: 0,
    position: 1,
    school: 2,
    contact: 3,
    email: 4,
  };

  const participants: ParticipantDetailsT[] = parsedData
    .map((row: any) => ({
      participantId: `T00001P1`,
      participant: row[columnNames.participants],
      position: row[columnNames.position],
      school: row[columnNames.school],
      contact: row[columnNames.contact],
      email: row[columnNames.email],
    }))
    .filter(
      (participant: ParticipantDetailsT) =>
        participant.participant.trim() !== ''
    );

  return participants;
}

export default function prettierJsonFromExcel(
  trainingData: any,
  speakersData: any,
  participantsData: any
) {
  const trainingDetails = prettierTrainingDetails(trainingData);
  const speakerDetails = prettierSpeakerDetails(speakersData[1]); // Assuming the speaker data is in the first column
  const participants = prettierParticipantDetails(participantsData.slice(2)); // Starting from the row with participant data

  const formattedData: TrainingInfoT = {
    training: trainingDetails,
    speaker: speakerDetails,
    participants,
  };

  return formattedData;
}
