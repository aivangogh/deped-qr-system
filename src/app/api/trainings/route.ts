import { prisma } from '@/lib/prisma';
import { CreateTrainingT } from '@/types/trainings';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const trainings = await prisma.training.findMany({
      include: {
        office: {
          select: {
            office: true,
            officeId: true,
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
      amount,
      year,
      dateFrom,
      dateTo,
      numberOfHours,
      venue,
      addressOfTheVenue,
      issuedOn,
      issuedAt,
      officeId,
      programHolder,
    } = (await request.json()) as CreateTrainingT;

    console.log(programHolder);
    console.log(officeId);

    await prisma.training.create({
      data: {
        trainingCode: await generateTrainingCode(),
        title: title.trim(),
        budgetAllocation: {
          create: {
            amount,
            year: parseInt(year as string),
          },
        },
        dateFrom,
        dateTo,
        numberOfHours,
        venue: venue.trim(),
        addressOfTheVenue: addressOfTheVenue.trim(),
        issuedOn,
        issuedAt: issuedAt.trim(),
        officeId,
        programHolder: programHolder.trim(),
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
  const incremented = count.toString().padStart(2, '0');

  const codeFormat = `MCD${year}${month}${incremented}`;
  return codeFormat;
}
