// Purpose: Prettify the JSON data extracted from the spreadsheet.
//          Removing null and empty array after parsing the data.

import {
  ParticipantDetailsT,
  TrainingDetailsT,
  TrainingInfoT,
} from '@/types/types';

// Function to convert Excel text date to JS Date
function excelTextToDate(excelTextDate: any): Date {
  const excelDate = Number(excelTextDate);
  if (isNaN(excelDate)) {
    throw new Error('Invalid date format');
  }

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const date = new Date((excelDate - 25569) * millisecondsPerDay);
  return date;
}

export default function prettierJson(parsedData: any) {
  // Define the column names and their respective indexes
  const columnNames = {
    title: 0,
    dateStart: 1,
    dateEnd: 2,
    hours: 3,
    programHolder: 4,
    participants: 0,
    position: 1,
    school: 2,
    contact: 3,
    email: 4,
  };

  // Extract the training details
  const trainingDetails: TrainingDetailsT = {
    trainingId: '2023-00001',
    title: parsedData[2][columnNames.title],
    date: {
      start: excelTextToDate(parsedData[2][columnNames.dateStart]),
      end: excelTextToDate(parsedData[2][columnNames.dateEnd]),
    },
    hours: parsedData[2][columnNames.hours],
    programHolder: parsedData[2][columnNames.programHolder],
  };

  // Extract the participant details
  const participants: ParticipantDetailsT[] = parsedData
    .slice(7) // Starting from the row with participant data
    .map((row: any) => ({
      participant: row[columnNames.participants],
      position: row[columnNames.position],
      school: row[columnNames.school],
      contact: row[columnNames.contact],
      email: row[columnNames.email],
    }));

  // Format the data object
  const formattedData: TrainingInfoT = {
    training: trainingDetails,
    participants: participants, // Filter out empty rows
  };

  return formattedData;
}
