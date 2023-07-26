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
      },
    });

    return NextResponse.json({
      data: training,
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
    date: { from, to },
    numberOfHours,
    venue,
    issuedOn,
    issuedAt,
    papId,
    validUntil,
  } = (await request.json()) as UpdateTrainingT;

  const updateTraining: UpdateTrainingT = {
    title,
    date: {
      from: new Date(from),
      to: new Date(to),
    },
    numberOfHours,
    venue,
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
