import { prisma } from '@/lib/prisma';
import { UpdateTrainingT } from '@/types/trainings';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log(params.id);

  try {
    const training = await prisma.training.findMany({
      where: {
        participant: {
          some: {
            id: params.id,
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
