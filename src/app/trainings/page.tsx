import { Training } from './data/columns';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';

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

export default async function DemoPage() {
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
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          {/* <div className="flex items-center space-x-2">
            <UserNav />
          </div> */}
        </div>
        <DataTable data={participant} columns={columns} />
      </div>
    </>
  );
}
