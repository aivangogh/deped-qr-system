'use client';

import { Row } from '@tanstack/react-table';
import DocumentGenerator from '@/app/trainings/components/participants/DocumentGeneratorForParticipant';
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
