import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import uniqid from 'uniqid';

type CreatePapType = {
  pap: string;
  description?: string;
};

export async function GET() {
  try {
    const paps = await prisma.pap.findMany();

    return NextResponse.json({
      data: paps,
      status: 200,
      message: 'PAPs found',
    });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}

export async function POST(request: Request) {
  try {
    const { pap, description } = (await request.json()) as CreatePapType;

    const _pap = await prisma.pap.create({
      data: {
        papId: uniqid.time(),
        pap,
        description,
      },
    });

    return NextResponse.json({
      data: _pap,
      status: 201,
      message: 'PAP created',
    });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}
