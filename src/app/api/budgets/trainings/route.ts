import { prisma } from '@/lib/prisma';
import {
  BudgetAllocation,
  TotalAmountByYear,
  TrainingWithBudgetAndTotalAmountT,
  TrainingWithBudgetT,
} from '@/types/training';
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

    const trainingsWithBudget: TrainingWithBudgetT[] =
      trainingsWithBudgetAllocation.map((training) => ({
        trainingCode: training.trainingCode,
        title: training.title,
        budgetAllocation: {
          amount: training.budgetAllocation[0].amount, // Assuming there is only one budget allocation per training
          year: training.budgetAllocation[0].year, // Assuming there is only one budget allocation per training
        },
      }));

    const totalAmountByYear: TotalAmountByYear[] = calculateTotalBudgetByYear(
      trainingsWithBudgetAllocation.map((training) => ({
        amount: training.budgetAllocation[0].amount, // Assuming there is only one budget allocation per training
        year: training.budgetAllocation[0].year, // Assuming there is only one budget allocation per training
      }))
    );

    return NextResponse.json({
      data: {
        trainingsWithBudget,
        totalAmountByYear,
      },
      status: 200,
      message: 'Trainings found',
    });
  } catch (err) {
    return NextResponse.json({ status: 500, error: err });
  }
}

// Function to calculate total budget for each year dynamically
function calculateTotalBudgetByYear(
  data: BudgetAllocation[]
): TotalAmountByYear[] {
  const totalAmountInYearMap = new Map<number, number>();

  for (const allocation of data) {
    const { year, amount } = allocation;
    if (totalAmountInYearMap.has(year)) {
      totalAmountInYearMap.set(year, totalAmountInYearMap.get(year)! + amount);
    } else {
      totalAmountInYearMap.set(year, amount);
    }
  }

  const totalAmountInYear: TotalAmountByYear[] = Array.from(
    totalAmountInYearMap.entries()
  ).map(([year, totalAmount]) => ({ year, totalAmount }));

  return totalAmountInYear;
}
