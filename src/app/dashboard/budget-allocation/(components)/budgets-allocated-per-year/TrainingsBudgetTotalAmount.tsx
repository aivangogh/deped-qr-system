'use client';

import {
  TotalAmountByYear
} from '@/types/training';
import { columnsForTotalAmount } from './columns-for-total-amount';
import { DataTableForTotalAmount } from './data-table-for-total-amount';

type BudgetAllocationPagePropsT = {
  data: TotalAmountByYear[];
};

export default function TrainingsBudgetTotalAmount({
  data,
}: BudgetAllocationPagePropsT) {

  return (
    <>
      <DataTableForTotalAmount columns={columnsForTotalAmount} data={data} />
    </>
  );
}
