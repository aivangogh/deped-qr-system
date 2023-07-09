'use client';

import { Row } from '@tanstack/react-table';
import DocumentGeneratorForSpeaker from '@/app/trainings/components/speakers/DocumentGeneratorForSpeaker';
import { SpeakerDetailsT } from '@/types/types';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const speaker = row.original as SpeakerDetailsT;

  return (
    <>
      <DocumentGeneratorForSpeaker speaker={speaker} />
    </>
  );
}
