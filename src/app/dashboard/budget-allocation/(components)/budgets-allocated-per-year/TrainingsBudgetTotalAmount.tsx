'use client';

import { getTrainingsBudget } from '@/services/fetch/budgets';
import useBudgetAllocationStore from '@/store/useBudgetAllocationStore';
import { TrainingWithBudgetAndTotalAmountT } from '@/types/training';
import { useQuery } from 'react-query';
import { columnsForTotalAmount } from './columns-for-total-amount';
import { DataTableForTotalAmount } from './data-table-for-total-amount';

export default function TrainingsBudgetTotalAmount() {
  const { totalAmountByYear, setTotalAmountByYear } =
    useBudgetAllocationStore();

  return (
    <>
      <DataTableForTotalAmount
        columns={columnsForTotalAmount}
        data={totalAmountByYear}
      />
    </>
  );
}
