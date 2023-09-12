import { prisma } from '@/lib/prisma';
import { UpdateApprovedBudgetT } from '@/types/budgets';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { year, amount } = (await request.json()) as UpdateApprovedBudgetT;

    await prisma.approvedBudget.update({
      where: {
        id: params.id,
      },
      data: {
        year,
        amount,
      },
    });

    return NextResponse.json({ status: 200, message: 'Budget updated' });
  } catch (err) {
    return NextResponse.json({ status: 500, error: err });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.approvedBudget.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ status: 200, message: 'Budget deleted' });
  } catch (err) {
    return NextResponse.json({ status: 500, error: err });
  }
}
