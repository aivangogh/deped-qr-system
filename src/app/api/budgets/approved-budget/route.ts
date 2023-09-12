import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const approvedBudget = await prisma.approvedBudget.findMany();

    return NextResponse.json({
      data: approvedBudget,
      status: 200,
      message: 'Approved Budget found',
    });
  } catch (err) {
    return NextResponse.json({ status: 500, error: err });
  }
}
