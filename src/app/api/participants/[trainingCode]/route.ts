import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { trainingCode: string } }
) {
  try {
    await prisma.participant.deleteMany({
      where: {
        trainingCode: params.trainingCode,
      },
    });

    return NextResponse.json({
      status: 200,
      message: 'All participants deleted successfully!',
    });
  } catch (err) {
    return NextResponse.json({ status: 500, error: err });
  }
}
