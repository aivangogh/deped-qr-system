import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import uniqid from 'uniqid';

type CreateOfficeType = {
  office: string;
  description?: string;
};

export async function GET() {
  try {
    const offices = await prisma.office.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      data: offices,
      status: 200,
      message: 'Offices found',
    });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}

export async function POST(request: Request) {
  try {
    const { office, description } = (await request.json()) as CreateOfficeType;

    const _office = await prisma.office.create({
      data: {
        officeId: uniqid.time(),
        office: office.trim(),
        description: description?.trim(),
      },
    });

    return NextResponse.json({
      data: _office,
      status: 201,
      message: 'Office created',
    });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}
