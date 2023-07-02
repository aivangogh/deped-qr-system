'use client';

import { TrainingDetailsT } from '@/types/types';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { EventInfo } from './components/event-info/EventInfo';
import useTrainingInfoStore from '@/store/useTrainingInfoStore';
import { EventDetails } from './components/event-info/EventDetails';

export default function TrainingInfoPage() {
  const { trainingInfo, participants } = useTrainingInfoStore();

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
        <EventDetails data={trainingInfo} />

        <DataTable data={participants} columns={columns} />
      </div>
    </>
  );
}
