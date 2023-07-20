import { prisma } from '@/lib/prisma';
import { TrainingsT } from '@/types/trainings';
import { NextResponse } from 'next/server';

export async function GET() {
  await prisma.training
    .findMany()
    .then((res) => {
      return NextResponse.json({
        data: res,
        status: 200,
        message: 'Trainings found',
      });
    })
    .catch((err) => {
      return NextResponse.json({ status: 500, error: err });
    });
}

export async function POST(request: Request) {
  const {
    title,
    date: { from, to },
    hours,
    venue,
    issuedOn,
    issuedAt,
    paps,
    validUntil,
  } = (await request.json()) as TrainingsT;

  const newTraining: TrainingsT = {
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
    trainingCode: await generateTrainingCode(),
    validUntil: new Date(validUntil),
  };

  await prisma.training
    .create({
      data: newTraining,
    })
    .then((res) => {
      return NextResponse.json({ status: 201, message: 'Training created' });
    })
    .catch((err) => {
      return NextResponse.json({ status: 500, error: err });
    });
}

async function generateTrainingCode(): Promise<string> {
  const trainingsCount = await prisma.training.count();
  const count = trainingsCount + 1;

  const year = new Date().getFullYear();
  const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
  const incremented = count.toString().padStart(4, '0');

  const codeFormat = `MCD${year}${month}${incremented}`;
  return codeFormat;
}
