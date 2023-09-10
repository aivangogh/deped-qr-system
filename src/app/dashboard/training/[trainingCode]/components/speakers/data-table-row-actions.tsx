'use client';

import { Row } from '@tanstack/react-table';
import DocumentGeneratorForSpeaker from './DocumentGeneratorForSpeaker';
import { SpeakerDetailsT } from '@/types/types';
import { Speaker } from '@prisma/client';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const speaker = row.original as Speaker;

  return (
    <>
      <DocumentGeneratorForSpeaker speaker={speaker} />
    </>
  );
}
