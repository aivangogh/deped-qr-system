'use client';

import { Row } from '@tanstack/react-table';
import DocumentGenerator from '@/components/DocumentGenerator';
import { ParticipantDetailsT } from '@/types/types';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const participant = row.original as ParticipantDetailsT;

  return (
    <>
      <DocumentGenerator participant={participant} />
    </>
  );
}
