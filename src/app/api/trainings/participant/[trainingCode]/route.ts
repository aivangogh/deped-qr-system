import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const trainings = await prisma.training.findMany({
      where: {
        participant: {
          some: {
            id: params.id,
          },
        },
      },
    });

    return NextResponse.json({
      data: trainings,
      status: 200,
      message: 'Training found',
    });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}