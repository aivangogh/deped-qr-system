import { prisma } from '@/lib/prisma';
import { UpdateTrainingT } from '@/types/trainings';
import { NextResponse } from 'next/server';
import { parse } from 'path';

export async function GET(
  request: Request,
  { params }: { params: { trainingCode: string } }
) {
  try {
    const training = await prisma.training.findUnique({
      where: {
        trainingCode: params.trainingCode,
      },
      include: {
        office: {
          select: {
            office: true,
            officeId: true,
          },
        },
        budgetAllocation: {
          select: {
            amount: true,
            year: true,
          },
        },
        speaker: true,
        participant: true,
      },
    });

    return NextResponse.json({
      data: {
        training: {
          id: training?.id,
          trainingCode: training?.trainingCode,
          createdAt: training?.createdAt,
          updatedAt: training?.updatedAt,
          title: training?.title,
          dateFrom: training?.dateFrom,
          dateTo: training?.dateTo,
          numberOfHours: training?.numberOfHours,
          venue: training?.venue,
          addressOfTheVenue: training?.addressOfTheVenue,
          issuedOn: training?.issuedOn,
          issuedAt: training?.issuedAt,
          programHolder: training?.programHolder,
          officeId: training?.office?.office,
          office: training?.office?.officeId,
        },
        speakers: training?.speaker,
        participants: training?.participant,
      },
      status: 200,
      message: 'Training found',
    });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { trainingCode: string } }
) {
  try {
    const {
      title,
      numberOfHours,
      venue,
      addressOfTheVenue,
      issuedAt,
      officeId,
      programHolder,
    } = (await request.json()) as UpdateTrainingT;

    await prisma.training.update({
      where: {
        trainingCode: params.trainingCode,
      },
      data: {
        title,
        numberOfHours,
        venue,
        addressOfTheVenue,
        issuedAt,
        officeId,
        programHolder,
      },
    });

    return NextResponse.json({ status: 200, message: 'Training updated' });
  } catch (err) {
    return NextResponse.json({ status: 500, error: err });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { trainingCode: string } }
) {
  try {
    console.log(params.trainingCode);
    const training = await prisma.training.delete({
      where: {
        trainingCode: params.trainingCode,
      },
    });

    return NextResponse.json({ status: 200, message: 'Training deleted' });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}
