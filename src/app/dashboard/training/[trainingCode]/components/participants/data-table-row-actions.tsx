'use client';

import { Row } from '@tanstack/react-table';
import { Participant } from '@prisma/client';
import { DocumentGeneratorForParticipant } from './DocumentGeneratorForParticipant';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const participant = row.original as Participant;

  return (
    <>
      <DocumentGeneratorForParticipant participant={participant!} />
    </>
  );
}
