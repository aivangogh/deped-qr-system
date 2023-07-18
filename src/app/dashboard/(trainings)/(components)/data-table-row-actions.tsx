'use client';

import { Row } from '@tanstack/react-table';
import { ParticipantDetailsT } from '@/types/types';
import DocumentGenerator from './DocumentGeneratorForParticipant';

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
