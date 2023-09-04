'use client';

import useTrainingInfoStore from '@/store/useTrainingInfoStore';
import { columnsForParticipants } from './components/participants/columnsForParticipants';
import { DataTableForParticipants } from './components/participants/data-table-for-participants';
import { columnsForSpeakers } from './components/speakers/columnsForSpeakers';
import { DataTableForSpeakers } from './components/speakers/data-table-for-speakers';
import { Separator } from '@/components/ui/separator';
import { useQuery } from 'react-query';
import { getTraining } from '@/services/fetch/trainings';
import { Training } from '@prisma/client';
import { TrainingDetails } from './components/training-details';
import useTrainingStore from '@/store/useTrainingStore';
import useSpeakerStore from '@/store/useSpeakerStore';
import useParticipantStore from '@/store/useParticipantStore';
import { set } from 'date-fns';
import TrainingSidebar from './components/sidebar/TrainingSidebar';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { dashboardRoutes } from '@/app/routes';
import { DialogFileUpload } from '@/app/dashboard/(components)/FileUploader/dialog-file-upload';
import { PresetActions } from '../../(components)/PresetActions';

export default function TrainingPage({
  params,
}: {
  params: { trainingCode: string };
}) {
  const { training, setTraining } = useTrainingStore();
  const { speakers, setSpeakers } = useSpeakerStore();
  const { participants, setParticipants } = useParticipantStore();

  useQuery({
    queryKey: ['training', params.trainingCode],
    queryFn: () => getTraining(params.trainingCode),
    onSuccess: ({ data }) => {
      console.log(data);
      setTraining(data.training);
      setSpeakers(data.speakers);
      setParticipants(data.participants);
    },
  });

  return (
    <div className="grid grid-cols-4">
      <div className="container col-span-3 h-full flex-1 flex-col space-y-8 mt-4 mb-8">
        {/* <TrainingDetails data={training} />
        <Separator /> */}
        <div className="flex justify-between">
          <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
            <Link
              href={dashboardRoutes.dashboard.path}
              className="overflow-hidden text-ellipsis whitespace-nowrap hover:text-foreground hover:underline"
            >
              {dashboardRoutes.dashboard.label}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <div className="font-medium text-foreground">
              {training.trainingCode}
            </div>
          </div>
          <div className="space-x-2">
            <DialogFileUpload />
            <PresetActions />
          </div>
        </div>
        <DataTableForSpeakers data={speakers} columns={columnsForSpeakers} />
        <Separator />
        <DataTableForParticipants
          data={participants}
          columns={columnsForParticipants}
        />
      </div>

      <TrainingSidebar />
    </div>
  );
}
