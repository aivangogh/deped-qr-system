'use client';

import { ColumnDef } from '@tanstack/react-table';

import { TrainingsT, TrainingsWithPapT } from '@/types/trainings';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { Training } from '@prisma/client';
import { TrainingT, TrainingWithBudgetT } from '@/types/training';
import toPhpCurrency from '@/utils/toPhpCurrency';

export const columnsForTrainingsBudget: ColumnDef<TrainingWithBudgetT>[] = [
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
          <span className="w-auto max-w-[400px] truncate font-medium">
            {row.getValue('title')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'year',
    accessorFn: (row) => row.budgetAllocation.year,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Year" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[75px] truncate font-medium">
            {row.getValue('year')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'amount',
    accessorFn: (row) => row.budgetAllocation.amount,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Budget Allocated" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[150px] truncate font-medium">
            {toPhpCurrency(row.getValue('amount'))}
          </span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: 'pap',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="PAP" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex space-x-2">
  //         <span className="max-w-[60px] font-medium">
  //           {
  //             row.getLeafRows().map((row) => {return row.getValue('pap')})
  //           }
  //         </span>
  //       </div>
  //     );
  //   },
  // },
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
  // {
  //   id: 'actions',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Actions" />
  //   ),
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
