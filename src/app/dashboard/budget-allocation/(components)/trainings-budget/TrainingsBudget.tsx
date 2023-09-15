'use client';

import { getTrainingsBudget } from '@/services/fetch/budgets';
import useTrainingsWithBudgetStore from '@/store/useTrainingsWithBudgetStore';
import { TrainingWithBudgetAndTotalAmountT } from '@/types/training';
import { useQuery } from 'react-query';
import { columnsForTrainingsBudget } from './columns-for-trainings-budget';
import { DataTableForTrainingsBudget } from './data-table-for-trainings-budget';

export default function BudgetAllocationPage() {
  const { trainingsWithBudget, setTrainingsWithBudget } =
    useTrainingsWithBudgetStore();

  return (
    <>
      <DataTableForTrainingsBudget
        columns={columnsForTrainingsBudget}
        data={trainingsWithBudget}
      />
    </>
  );
}
