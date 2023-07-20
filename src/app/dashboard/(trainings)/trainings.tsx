'use client';

import useTrainingsStore from '@/store/useTrainingsStore';
import { columnsForTrainings } from './(components)/columns-for-trainings';
import { DataTableForTrainings } from './(components)/data-table-for-trainings';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { dashboardRoutes, navRoutes } from '@/app/routes';
import { Plus } from 'lucide-react';

export default function Trainings() {
  const { trainings } = useTrainingsStore();

  return (
    <>
      <div className="space-y-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of trainings.
            </p>
          </div>
          <div>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              <Link href={dashboardRoutes.addTraining.path}>Add Training</Link>
            </Button>
          </div>
        </div>
        <DataTableForTrainings data={trainings} columns={columnsForTrainings} />
      </div>
    </>
  );
}
