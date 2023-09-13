'use client';

import { getTraining } from '@/services/fetch/trainings';
import useParticipantStore from '@/store/useParticipantStore';
import useSpeakerStore from '@/store/useSpeakerStore';
import useTrainingStore from '@/store/useTrainingStore';
import { useQuery } from 'react-query';
import Training from './components/Training';
import LoadingSpinner from '@/components/LoadingSpinner';
import { TrainingDetailsT } from '@/types/training';

export default function TrainingPage({
  params,
}: {
  params: { trainingCode: string };
}) {
  const { setTraining } = useTrainingStore();
  const { speakers, setSpeakers } = useSpeakerStore();
  const { participants, setParticipants } = useParticipantStore();

  const { isLoading } = useQuery({
    queryKey: ['training', params.trainingCode],
    queryFn: () => getTraining(params.trainingCode),
    onSuccess: ({ data }: { data: TrainingDetailsT }) => {
      console.log(data);
      setTraining(data.training);
      setSpeakers(data.speakers);
      setParticipants(data.participants);
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  } else {
    return <Training />;
  }
}
