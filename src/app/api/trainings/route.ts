import { prisma } from '@/lib/prisma';
import { TrainingsT } from '@/types/trainings';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const trainings = await prisma.training.findMany({
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
      data: trainings,
      status: 200,
      message: 'Trainings found',
    });
  } catch (err) {
    return NextResponse.json({ status: 500, error: err });
  }
}

export async function POST(request: Request) {
  try {
    const {
      title,
      date: { from, to },
      numberOfHours,
      venue,
      issuedOn,
      issuedAt,
      papId,
      validUntil,
    } = (await request.json()) as TrainingsT;

    await prisma.training.create({
      data: {
        title,
        dateFrom: new Date(from),
        dateTo: new Date(to),
        numberOfHours,
        venue,
        issuedOn: new Date(issuedOn),
        issuedAt,
        papId,
        trainingCode: await generateTrainingCode(),
        validUntil: new Date(validUntil),
      },
    });

    return NextResponse.json({ status: 201, message: 'Training created' });
  } catch (err) {
    return NextResponse.json({ status: 500, error: err });
  }
}

async function generateTrainingCode() {
  const trainingsCount = await prisma.training.count();
  const count = trainingsCount + 1;

  const year = new Date().getFullYear();
  const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
  const incremented = count.toString().padStart(4, '0');

  const codeFormat = `MCD${year}${month}${incremented}`;
  return codeFormat;
}
