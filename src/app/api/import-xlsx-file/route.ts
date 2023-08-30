import { prisma } from '@/lib/prisma';
import { parseExcelToJson } from '@/utils/parseExcelToJson';
import prettierJsonFromExcel, {
  prettierSpeakerDetails,
  prettierTrainingDetails,
} from '@/utils/prettierJsonFromExcel';
import { NextResponse } from 'next/server';
import { read, utils, WorkBook } from 'xlsx';
import { prettierParticipantDetails } from '../../../utils/prettierJsonFromExcel';

export async function POST(request: Request) {
  console.log('HELLO');
  const data = await request.formData();

  const file: File | null = data.get('xlsx-file') as unknown as File;

  console.log(file);
  if (!file) {
    return NextResponse.json({ success: false });
  }

  try {
    const fileBuffer = await file.arrayBuffer();
    const trainingSheetIndex = 0;
    const speakersSheetIndex = 1;
    const participantsSheetIndex = 2;

    const trainingData = await parseExcelToJson(fileBuffer, trainingSheetIndex);
    const speakersData = await parseExcelToJson(fileBuffer, speakersSheetIndex);
    const participantsData = await parseExcelToJson(
      fileBuffer,
      participantsSheetIndex
    );

    const formattedTraining = prettierTrainingDetails(trainingData[2]);
    const formattedSpeakers = prettierSpeakerDetails(speakersData[2]);
    const formattedParticipants = prettierParticipantDetails(
      participantsData.slice(2)
    );

    console.log(formattedTraining);
    console.log(formattedSpeakers);
    console.log(formattedParticipants);

    // Perform any further actions with formattedData
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ status: 500, error });
  }
}
