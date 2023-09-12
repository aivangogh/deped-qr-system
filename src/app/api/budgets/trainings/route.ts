import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const trainingsWithBudgetAllocation = await prisma.training.findMany({
      select: {
        trainingCode: true,
        title: true,
        budgetAllocation: {
          select: {
            amount: true,
            year: true,
          },
        },
      },
    });

    return NextResponse.json({
      data: trainingsWithBudgetAllocation,
      status: 200,
      message: 'Trainings found',
    });
  } catch (err) {
    return NextResponse.json({ status: 500, error: err });
  }
}
