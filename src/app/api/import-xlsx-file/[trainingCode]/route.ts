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
    // const trainingSheetIndex = 2;
    const speakersSheetIndex = 1;
    const participantsSheetIndex = 2;

    // const trainingData = await parseExcelToJson(fileBuffer, trainingSheetIndex);
    const speakersData = await parseExcelToJson(fileBuffer, speakersSheetIndex);
    const participantsData = await parseExcelToJson(
      fileBuffer,
      participantsSheetIndex
    );

    const dataRows = speakersData.slice(1);
    const speakersDataWithoutEmptyArrays: any[][] = dataRows.filter(
      (subArray: any[]) => {
        // Check if the subarray is not empty
        return subArray.length > 0;
      }
    );

    // Similarly for participantsData
    const dataRowsParticipants = participantsData.slice(1);
    const participantsDataWithoutEmptyArrays: any[][] =
      dataRowsParticipants.filter((subArray: any[]) => {
        // Check if the subarray is not empty
        return subArray.length > 0;
      });

    console.log(speakersDataWithoutEmptyArrays);
    console.log(participantsDataWithoutEmptyArrays);

    const { speakers, participants } = prettierJsonFromExcel(
      params.trainingCode,
      speakersDataWithoutEmptyArrays,
      participantsDataWithoutEmptyArrays
    );

    if (speakers.length > 0) {
      await prisma.speaker.createMany({
        data: speakers,
      });
    }

    if (participants.length > 0) {
      await prisma.participant.createMany({
        data: participants,
      });
    }

    if (speakers.length > 0 || participants.length > 0) {
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
