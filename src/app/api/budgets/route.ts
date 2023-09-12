import { prisma } from '@/lib/prisma';
import { CreateApprovedBudgetT } from '@/types/budgets';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const budgetAllocations = await prisma.budgetAllocation.findMany();

    return NextResponse.json({
      data: budgetAllocations,
      status: 200,
      message: 'Budgets found',
    });
  } catch (err) {
    return NextResponse.json({ status: 500, error: err });
  }
}

export async function POST(request: Request) {
  try {
    const { year, amount } = (await request.json()) as CreateApprovedBudgetT;

    await prisma.approvedBudget.create({
      data: {
        year,
        amount,
      },
    });

    return NextResponse.json({ status: 201, message: 'Budget created' });
  } catch (err) {
    return NextResponse.json({ status: 500, error: err });
  }
}
