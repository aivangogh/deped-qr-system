'use client';

import { TrainingDetailsT } from '@/types/types';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { EventInfo } from './components/event-info/EventInfo';
import useTrainingInfoStore from '@/store/useTrainingInfoStore';

export default function TrainingInfoPage() {
  const { trainingInfo, participants } = useTrainingInfoStore();

  console.log(trainingInfo);
  console.log(participants);

  // const participants = [
  //   {
  //     id: "2023-00001",
  //     participant: 'John Doe',
  //     position: 'Principal',
  //     school: 'St. John',
  //     contact: "9123456789",
  //     email: 'ivan@gmail.com',
  //   },
  // ];

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
        <EventInfo data={trainingInfo} />

        <DataTable data={participants} columns={columns} />
      </div>
    </>
  );
}
