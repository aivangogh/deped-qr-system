import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

type UpdateProfileType = {
  position: string;
  school: string;
  contactNumber: string;
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log(params.id);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({
      data: user,
      status: 200,
      message: 'Profile found',
    });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('HELLO');
  try {
    const { position, school, contactNumber } =
      (await request.json()) as UpdateProfileType;

    const user = await prisma.user.update({
      where: {
        id: params.id,
        isSubmitted: false,
      },
      data: {
        position,
        school,
        contactNumber,
        isSubmitted: true,
      },
    });

    return NextResponse.json({
      data: user,
      status: 201,
      message: 'PAP created',
    });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}
