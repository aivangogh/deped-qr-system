'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Training = {
  id: string;
  participant: string;
  position: string;
  school: string;
  status: string,
  contact: string;
  email: string;
};

export const columns: ColumnDef<Training>[] = [
  {
    accessorKey: 'participant',
    header: 'Participant',
  },
  {
    accessorKey: 'position',
    header: 'Position',
  },
  {
    accessorKey: 'school',
    header: 'School',
  },
  {
    accessorKey: 'contact',
    header: 'Contact',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
];
