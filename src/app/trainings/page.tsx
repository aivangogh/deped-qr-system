import { Payment, Training, columns } from './columns';
import { DataTable } from './data-table';

async function getData(): Promise<Training[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      participant: 'John Doe',
      position: 'Principal',
      school: 'San Jose Elementary School',
      contact: '09123456789',
      email: 'johndoe@example.com',
    },
    {
      id: '728ed52f',
      participant: 'John Doe',
      position: 'Principal',
      school: 'San Jose Elementary School',
      contact: '09123456789',
      email: 'johndoe@example.com',
    },
    {
      id: '728ed52f',
      participant: 'John Doe',
      position: 'Principal',
      school: 'San Jose Elementary School',
      contact: '09123456789',
      email: 'johndoe@example.com',
    },
    {
      id: '728ed52f',
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
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
