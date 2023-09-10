'use client';

import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';

import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';
import DialogGenerateBulkCertificatesForSpeakers from './DialogGenerateBulkCertificatesForSpeakers';
import SendViaEmailSpeakers from './SendViaEmailSpeakers';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="flex items-center">
          <Filter className="mr-2 h-4 w-4" />
          <Input
            placeholder="Filter speaker..."
            value={
              (table.getColumn('speaker')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('speaker')?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        </div>
        {/* {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={statuses}
          />
        )} */}
        {/* {table.getColumn('priority') && (
          <DataTableFacetedFilter
            column={table.getColumn('priority')}
            title="Priority"
            options={priorities}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <SendViaEmailSpeakers />
        <DialogGenerateBulkCertificatesForSpeakers />
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
