'use client';

import useTrainingsStore from '@/store/useTrainingsStore';
import { columnsForTrainings } from './(components)/columns-for-trainings';
import { DataTableForTrainings } from './(components)/data-table-for-trainings';

export default function Trainings() {
  const { trainings } = useTrainingsStore();

  return (
    <>
      <div className="space-y-6 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of trainings.
          </p>
        </div>
        <DataTableForTrainings data={trainings} columns={columnsForTrainings} />
      </div>
    </>
  );
}
