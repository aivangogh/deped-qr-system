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

function removeEmptyArrays<T>(arr: T[][]): T[][] {
  const nonEmptyArrays = arr.filter((subArr) => subArr.length > 0);
  return nonEmptyArrays;
}

export function prettierTrainingDetails(trainingCode: string, parsedData: any) {
  const columnNames = {
    title: 0,
    dateStart: 1,
    dateEnd: 2,
    hours: 3,
  };

  if (!parsedData) {
    throw new Error('parsedData is undefined');
  }

  const titleValue = parsedData[columnNames.title]?.trim(); // Trim whitespace
  const dateStartValue = parsedData[columnNames.dateStart]; // No need to trim dates
  const dateEndValue = parsedData[columnNames.dateEnd]; // No need to trim dates
  const hoursValue = parsedData[columnNames.hours];

  // Check if all necessary fields are empty, and if so, return null
  if (!titleValue && !dateStartValue && !dateEndValue && !hoursValue) {
    return null;
  }

  const trainingDetails: TrainingDetailsT = {
    trainingCode,
    title: titleValue || 'N/A', // Set a default value if empty
    date: {
      start: excelTextToDate(dateStartValue),
      end: excelTextToDate(dateEndValue),
    },
    hours: hoursValue || 0, // Set a default value if empty
  };

  return trainingDetails;
}

export function prettierSpeakerDetails(trainingCode: string, parsedData: any) {
  const columnNames = {
    speakers: 0,
    role: 1,
    email: 2,
  };

  if (!parsedData) {
    throw new Error('parsedData is undefined');
  }

  // Skip the first row (header row) and start processing from the second row
  const dataRows = parsedData.slice(2); // Slice to remove the first row

  const speakers: SpeakerDetailsT[] = parsedData
    .map((row: any, index: number) => {
      const speakerValue = row[columnNames.speakers]?.trim() || null; // Trim whitespace
      const roleValue = row[columnNames.role]?.trim() || null; // Trim whitespace
      const emailValue = row[columnNames.email]?.trim() || null; // Trim whitespace

      return {
        speakerId: `${trainingCode}S${index + 1}`,
        speaker: speakerValue, // Set a default value if empty
        trainingCode: trainingCode,
        role: roleValue, // Set a default value if empty
        email: emailValue, // Set a default value if empty
      };
    })
    .filter(Boolean); // Remove null values (rows with all empty cells)

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

  if (!parsedData) {
    throw new Error('parsedData is undefined');
  }

  // Skip the first row (header row) and start processing from the second row
  const dataRows = parsedData.slice(2); // Slice to remove the first row

  const participants: ParticipantDetailsT[] = parsedData
    .map((row: any, index: number) => {
      const participantValue = row[columnNames.participants]?.trim() || null; // Trim whitespace
      const positionValue = row[columnNames.position]?.trim() || null; // Trim whitespace
      const schoolValue = row[columnNames.school]?.trim() || null; // Trim whitespace
      const emailValue = row[columnNames.email]?.trim() || null; // Trim whitespace
      const contactValue = row[columnNames.contact]?.toString() || null;

      // Check if all necessary fields are empty, and if so, skip this row
      if (
        !participantValue &&
        !positionValue &&
        !schoolValue &&
        !contactValue &&
        !emailValue
      ) {
        return null;
      }

      return {
        participantId: `${trainingCode}P${index + 1}`,
        participant: participantValue, // Set a default value if empty
        position: positionValue, // Set a default value if empty
        school: schoolValue, // Set a default value if empty
        contact: contactValue, // Set a default value if empty
        email: emailValue, // Set a default value if empty
        trainingCode: trainingCode,
      };
    })
    .filter(Boolean); // Remove null values (rows with all empty cells)

  return participants;
}

export default function prettierJsonFromExcel(
  trainingCode: string,
  speakersData: any,
  participantsData: any
) {
  const speakers = prettierSpeakerDetails(trainingCode, speakersData); // Assuming the speaker data is in the first column
  const participants = prettierParticipantDetails(
    trainingCode,
    participantsData
  ); // Starting from the row with participant data

  const formattedData: Omit<TrainingInfoT, 'training'> = {
    speakers,
    participants,
  };

  return formattedData;
}
