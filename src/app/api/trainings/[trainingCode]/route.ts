import { prisma } from '@/lib/prisma';
import { UpdateTrainingT } from '@/types/trainings';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { trainingCode: string } }
) {
  await prisma.training
    .findUnique({
      where: {
        trainingCode: params.trainingCode,
      },
    })
    .then((res) => {
      return NextResponse.json({
        data: res,
        status: 200,
        message: 'Training found',
      });
    })
    .catch((err) => {
      return NextResponse.json({ status: 500, error: err });
    });
}

export async function PUT(
  request: Request,
  { params }: { params: { trainingCode: string } }
) {
  const {
    title,
    date: { from, to },
    hours,
    venue,
    issuedOn,
    issuedAt,
    paps,
    validUntil,
  } = (await request.json()) as UpdateTrainingT;

  const updateTraining: UpdateTrainingT = {
    title,
    date: {
      from: new Date(from),
      to: new Date(to),
    },
    hours,
    venue,
    issuedOn: new Date(issuedOn),
    issuedAt: new Date(issuedAt),
    paps,
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
