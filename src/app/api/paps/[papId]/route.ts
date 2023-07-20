import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

type PapType = {
  papId: string;
};

export async function GET(request: Request) {
  const { papId } = (await request.json()) as PapType;

  await prisma.pap
    .findUnique({
      where: {
        papId,
      },
    })
    .then((res) => {
      return NextResponse.json({
        data: res,
        status: 200,
        message: 'PAP found',
      });
    })
    .catch((err) => {
      return NextResponse.json({ status: 500, error: err });
    });
}
