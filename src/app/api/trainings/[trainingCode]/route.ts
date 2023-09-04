import { prisma } from '@/lib/prisma';
import { UpdateTrainingT } from '@/types/trainings';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { trainingCode: string } }
) {
  try {
    const training = await prisma.training.findUnique({
      where: {
        trainingCode: params.trainingCode,
      },
      include: {
        pap: {
          select: {
            pap: true,
            papId: true,
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
          validUntil: training?.validUntil,
          papId: training?.papId,
        },
        speakers: training?.speaker,
        participants: training?.participant,
      },
      status: 200,
      message: 'Training found',
    });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { trainingCode: string } }
) {
  const {
    title,
    dateFrom,
    dateTo,
    numberOfHours,
    venue,
    addressOfTheVenue,
    issuedOn,
    issuedAt,
    papId,
    validUntil,
  } = (await request.json()) as UpdateTrainingT;

  const updateTraining: UpdateTrainingT = {
    title,
    dateFrom,
    dateTo,
    numberOfHours,
    venue,
    addressOfTheVenue,
    issuedOn: new Date(issuedOn),
    issuedAt,
    papId,
    validUntil: new Date(validUntil),
  };

  await prisma.training
    .update({
      where: {
        trainingCode: params.trainingCode,
      },
      data: updateTraining,
    })
    .then((res) => {
      return NextResponse.json({ status: 200, message: 'Training updated' });
    })
    .catch((err) => {
      return NextResponse.json({ status: 500, error: err });
    });
}
