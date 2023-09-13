import { parseExcelToJson } from '@/utils/parseExcelToJson';
import prettierJsonFromExcel, {
  prettierSpeakerDetails,
  prettierTrainingDetails,
} from '@/utils/prettierJsonFromExcel';
import { NextResponse } from 'next/server';
import { prettierParticipantDetails } from '../../../../utils/prettierJsonFromExcel';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { trainingCode: string } }
) {
  const data = await request.formData();
  const file: File | null = data.get('xlsx-file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  console.log(params.trainingCode);

  try {
    const fileBuffer = await file.arrayBuffer();
    const trainingSheetIndex = 1;
    const speakersSheetIndex = 2;
    const participantsSheetIndex = 3;

    const trainingData = await parseExcelToJson(fileBuffer, trainingSheetIndex);
    const speakersData = await parseExcelToJson(fileBuffer, speakersSheetIndex);
    const participantsData = await parseExcelToJson(
      fileBuffer,
      participantsSheetIndex
    );

    const { training, speakers, participants } = prettierJsonFromExcel(
      params.trainingCode,
      trainingData[2],
      speakersData.slice(2),
      participantsData.slice(2)
    );

    const _speakers = await prisma.speaker.createMany({
      data: speakers,
    });

    const _participants = await prisma.participant.createMany({
      data: participants,
    });

    console.log(_speakers);
    console.log(_participants);

    if (_speakers && _participants) {
      return NextResponse.json({
        status: 200,
        data: {
          training: training,
          speakers: speakers,
          participants: participants,
        },
      });
    }

    // Perform any further actions with formattedData
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ status: 500, error });
  }
}
