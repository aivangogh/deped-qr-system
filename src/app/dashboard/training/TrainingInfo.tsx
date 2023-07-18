'use client';

import useTrainingInfoStore from '@/store/useTrainingInfoStore';
import { columnsForParticipants } from './components/participants/columnsForParticipants';
import { EventDetails } from './event-info/EventDetails';
import { Separator } from '@/components/ui/separator';
import { columnsForSpeakers } from './components/speakers/columnsForSpeakers';
import { DataTableForParticipants } from './components/participants/data-table-for-participants';
import { DataTableForSpeakers } from './components/speakers/data-table-for-speakers';

export default function TrainingInfoPage() {
  const { trainingInfo, speakers, participants } = useTrainingInfoStore();

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
        <EventDetails data={trainingInfo} />
        <Separator />
        <DataTableForSpeakers data={speakers} columns={columnsForSpeakers} />
        <Separator />
        <DataTableForParticipants
          data={participants}
          columns={columnsForParticipants}
        />
      </div>
    </>
  );
}
