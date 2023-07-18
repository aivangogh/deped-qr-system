'use client';

import { ColumnDef } from '@tanstack/react-table';

import { TrainingsT } from '@/types/trainings';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

export const columnsForTrainings: ColumnDef<TrainingsT>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'trainingCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Training Code" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] font-medium">{row.getValue('trainingCode')}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[150px] truncate font-medium">
            {row.getValue('title')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[150px] truncate font-medium">
            {row.getValue('date')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'venue',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Venue" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue('venue')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'paps',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PAPs" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[60px] font-medium">
            {row.getValue('paps')}
          </span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: 'email',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Email" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex space-x-2">
  //         <span className="max-w-[100px] font-medium">
  //           {row.getValue('email')}
  //         </span>
  //       </div>
  //     );
  //   },
  // },
  {
    id: 'action',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
