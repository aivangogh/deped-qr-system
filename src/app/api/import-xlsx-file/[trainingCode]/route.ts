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
      const training = await prisma.training.findUnique({
        where: {
          trainingCode: params.trainingCode,
        },
        include: {
          office: {
            select: {
              office: true,
              officeId: true,
            },
          },
          speaker: true,
          participant: true,
        },
      });

      return NextResponse.json({
        data: {
          training: {
            id: training?.id,
            trainingCode: training?.trainingCode,
            createdAt: training?.createdAt,
            updatedAt: training?.updatedAt,
            title: training?.title,
            dateFrom: training?.dateFrom,
            dateTo: training?.dateTo,
            numberOfHours: training?.numberOfHours,
            venue: training?.venue,
            addressOfTheVenue: training?.addressOfTheVenue,
            issuedOn: training?.issuedOn,
            issuedAt: training?.issuedAt,
            programHolder: training?.programHolder,
            officeId: training?.office?.office,
            office: training?.office?.officeId,
          },
          speakers: training?.speaker,
          participants: training?.participant,
        },
        status: 200,
        message: 'Training found',
      });
    }

    // Perform any further actions with formattedData
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ status: 500, error });
  }
}
