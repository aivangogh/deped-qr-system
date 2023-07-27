import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { trainingCode, id } = (await request.json()) as {
      trainingCode: string;
      id: string;
    };

    // Check if the training code exists in the database
    const training = await prisma.training.findUnique({
      where: { trainingCode },
    });

    if (!training) {
      return NextResponse.json({
        status: 404,
        message: 'Training not found',
      });
    }

    const participant = await prisma.participant.create({
      data: {
        trainingId: training.id,
        userId: id,
      },
    });

    return NextResponse.json({
      data: participant,
      status: 201,
      message: 'Participant created',
    });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}
