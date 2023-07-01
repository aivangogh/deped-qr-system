'use client';

import useParticipantsStore from '@/store/useParticipantsStore';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { EventInfo } from './components/event-info/EventInfo';
import useTrainingInfoStore from '@/store/useTrainingInfoStore';

export default async function TrainingInfoPage() {
  const trainingDetails = useTrainingInfoStore((state) => state.trainingInfo);
  const participants = useParticipantsStore((state) => state.participants);

  console.log(trainingDetails);
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
      {/* <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div> */}

      <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
        <EventInfo />

        <DataTable data={participants} columns={columns} />
      </div>
    </>
  );
}
