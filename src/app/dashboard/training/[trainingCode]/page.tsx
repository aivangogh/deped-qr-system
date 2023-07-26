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

export default function TrainingPage({
  params,
}: {
  params: { trainingCode: string };
}) {
  const { trainingInfo, speakers, participants } = useTrainingInfoStore();
  const { training, setTraining } = useTrainingStore();

  useQuery({
    queryKey: ['training', params.trainingCode],
    queryFn: () => getTraining(params.trainingCode),
    onSuccess: ({ data }) => {
      console.log(data)
      setTraining(data);
    },
  });

  return (
    <div className="container w-full h-full flex-1 flex-col space-y-8 mt-4 mb-8">
      <TrainingDetails data={training} />
      <Separator />
      <DataTableForSpeakers data={speakers} columns={columnsForSpeakers} />
      <Separator />
      <DataTableForParticipants
        data={participants}
        columns={columnsForParticipants}
      />
    </div>
  );
}
