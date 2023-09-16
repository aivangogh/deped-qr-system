'use client';

import { TrainingWithBudgetT } from '@/types/training';
import { columnsForTrainingsBudget } from './columns-for-trainings-budget';
import { DataTableForTrainingsBudget } from './data-table-for-trainings-budget';

type BudgetAllocationPagePropsT = {
  data: TrainingWithBudgetT[];
};

export default function BudgetAllocationPage({
  data,
}: BudgetAllocationPagePropsT) {
  return (
    <>
      <DataTableForTrainingsBudget
        columns={columnsForTrainingsBudget}
        data={data}
      />
    </>
  );
}
