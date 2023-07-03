'use client';

import useTrainingInfoStore from '@/store/useTrainingInfoStore';
import { columnsForParticipants } from './components/columnsForParticipants';
import { columnsForSpeakers } from './components/columnsForSpeakers';
import { DataTableForParticipants } from './components/data-table-for-participants';
import { DataTableForSpeakers } from './components/data-table-for-speakers';
import { EventDetails } from './components/event-info/EventDetails';
import { Separator } from '@/components/ui/separator';

export default function TrainingInfoPage() {
  const { trainingInfo, speakers, participants } = useTrainingInfoStore();

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
        <EventDetails data={trainingInfo} />
        <Separator />
        <DataTableForSpeakers
          data={speakers}
          columns={columnsForSpeakers}
        />
        <Separator />
        <DataTableForParticipants
          data={participants}
          columns={columnsForParticipants}
        />
      </div>
    </>
  );
}
