import { Training } from './data/columns';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { EventInfo } from './components/event-info/EventInfo';
import { DialogFileUpload } from './FileUploader/dialog-file-upload';
import { Separator } from '@/components/ui/separator';
import Header from './Header';

async function getData() {
  // Fetch data from your API here.
  return [
    {
      id: '2023-00001',
      participant: 'John Doe',
      position: 'Principal',
      school: 'San Jose Elementary School',
      contact: '09123456789',
      email: 'johndoe@example.com',
    },
    {
      id: '2023-00002',
      participant: 'John Doe',
      position: 'Principal',
      school: 'San Jose Elementary School',
      contact: '09123456789',
      email: 'johndoe@example.com',
    },
    {
      id: '2023-00002',
      participant: 'John Doe',
      position: 'Principal',
      school: 'San Jose Elementary School',
      contact: '09123456789',
      email: 'johndoe@example.com',
    },
    {
      id: '2023-00003',
      participant: 'John Doe',
      position: 'Principal',
      school: 'San Jose Elementary School',
      contact: '09123456789',
      email: 'johndoe@example.com',
    },
    {
      id: '2023-00001',
      participant: 'John Doe',
      position: 'Principal',
      school: 'San Jose Elementary School',
      contact: '09123456789',
      email: 'johndoe@example.com',
    },
    {
      id: '2023-00002',
      participant: 'John Doe',
      position: 'Principal',
      school: 'San Jose Elementary School',
      contact: '09123456789',
      email: 'johndoe@example.com',
    },
    {
      id: '2023-00002',
      participant: 'John Doe',
      position: 'Principal',
      school: 'San Jose Elementary School',
      contact: '09123456789',
      email: 'johndoe@example.com',
    },
    {
      id: '2023-00003',
      participant: 'John Doe',
      position: 'Principal',
      school: 'San Jose Elementary School',
      contact: '09123456789',
      email: 'johndoe@example.com',
    },
    {
      id: '2023-00001',
      participant: 'John Doe',
      position: 'Principal',
      school: 'San Jose Elementary School',
      contact: '09123456789',
      email: 'johndoe@example.com',
    },
    {
      id: '2023-00002',
      participant: 'John Doe',
      position: 'Principal',
      school: 'San Jose Elementary School',
      contact: '09123456789',
      email: 'johndoe@example.com',
    },
    {
      id: '2023-00002',
      participant: 'John Doe',
      position: 'Principal',
      school: 'San Jose Elementary School',
      contact: '09123456789',
      email: 'johndoe@example.com',
    },
    {
      id: '2023-00003',
      participant: 'John Doe',
      position: 'Principal',
      school: 'San Jose Elementary School',
      contact: '09123456789',
      email: 'johndoe@example.com',
    },
    {
      id: '2023-00001',
      participant: 'John Doe',
      position: 'Principal',
      school: 'San Jose Elementary School',
      contact: '09123456789',
      email: 'johndoe@example.com',
    },
    {
      id: '2023-00002',
      participant: 'John Doe',
      position: 'Principal',
      school: 'San Jose Elementary School',
      contact: '09123456789',
      email: 'johndoe@example.com',
    },
    {
      id: '2023-00002',
      participant: 'John Doe',
      position: 'Principal',
      school: 'San Jose Elementary School',
      contact: '09123456789',
      email: 'johndoe@example.com',
    },
    {
      id: '2023-00003',
      participant: 'John Doe',
      position: 'Principal',
      school: 'San Jose Elementary School',
      contact: '09123456789',
      email: 'johndoe@example.com',
    },
    {
      id: '2023-00001',
      participant: 'John Doe',
      position: 'Principal',
      school: 'San Jose Elementary School',
      contact: '09123456789',
      email: 'johndoe@example.com',
    },
    {
      id: '2023-00002',
      participant: 'John Doe',
      position: 'Principal',
      school: 'San Jose Elementary School',
      contact: '09123456789',
      email: 'johndoe@example.com',
    },
    {
      id: '2023-00002',
      participant: 'John Doe',
      position: 'Principal',
      school: 'San Jose Elementary School',
      contact: '09123456789',
      email: 'johndoe@example.com',
    },
    {
      id: '2023-00003',
      participant: 'John Doe',
      position: 'Principal',
      school: 'San Jose Elementary School',
      contact: '09123456789',
      email: 'johndoe@example.com',
    },
    {
      id: '2023-00001',
      participant: 'John Doe',
      position: 'Principal',
      school: 'San Jose Elementary School',
      contact: '09123456789',
      email: 'johndoe@example.com',
    },
    {
      id: '2023-00002',
      participant: 'John Doe',
      position: 'Principal',
      school: 'San Jose Elementary School',
      contact: '09123456789',
      email: 'johndoe@example.com',
    },
    {
      id: '2023-00002',
      participant: 'John Doe',
      position: 'Principal',
      school: 'San Jose Elementary School',
      contact: '09123456789',
      email: 'johndoe@example.com',
    },
    {
      id: '2023-00003',
      participant: 'John Doe',
      position: 'Principal',
      school: 'San Jose Elementary School',
      contact: '09123456789',
      email: 'johndoe@example.com',
    },
    // ...
  ];
}

export default async function TrainingInfoPage() {
  const participant = await getData();

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

        <DataTable data={participant} columns={columns} />
      </div>
    </>
  );
}
