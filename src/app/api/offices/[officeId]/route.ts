import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type OfficeType = {
  officeId: string;
};

export async function GET(request: Request) {
  try {
    const { officeId } = (await request.json()) as OfficeType;

    const office = await prisma.office.findUnique({
      where: {
        officeId,
      },
    });

    return NextResponse.json({
      data: office,
      status: 200,
      message: 'Office found',
    });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}

export async function DELETE(request: Request) {
  try {
    const { officeId } = (await request.json()) as OfficeType;

    await prisma.office.delete({
      where: {
        officeId,
      },
    });

    return NextResponse.json({
      status: 200,
      message: 'Office deleted',
    });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}
