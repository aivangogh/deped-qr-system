'use client';

import { dashboardRoutes } from '@/app/routes';
import { Button } from '@/components/ui/button';
import { getTrainings } from '@/services/fetch/trainings';
import useTrainingsStore from '@/store/useTrainingsStore';
import { TrainingT } from '@/types/training';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { columnsForTrainings } from './(components)/columns-for-trainings';
import { DataTableForTrainings } from './(components)/data-table-for-trainings';

export default function TrainingsPage() {
  const { trainings, setTrainings } = useTrainingsStore();

  useQuery({
    queryKey: 'trainings',
    queryFn: () => getTrainings(),
    onSuccess: ({ data }: { data: TrainingT[] }) => {
      console.log(data);
      setTrainings(data);
    },
  });

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
