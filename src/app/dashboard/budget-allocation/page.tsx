'use client';

import { getTrainingsBudget } from '@/services/fetch/budgets';
import useTrainingsWithBudgetStore from '@/store/useTrainingsWithBudgetStore';
import { TrainingWithBudgetAndTotalAmountT } from '@/types/training';
import { useQuery } from 'react-query';
import TrainingsBudgetTotalAmount from './(components)/budgets-allocated-per-year/TrainingsBudgetTotalAmount';
import TrainingsBudget from './(components)/trainings-budget/TrainingsBudget';
import useBudgetAllocationStore from '@/store/useBudgetAllocationStore';
import LoadingSpinner from '@/components/LoadingSpinner';

export const dynamic = 'force-dynamic';

type BudgetAllocationPagePropsT = {
  data: TrainingWithBudgetAndTotalAmountT;
};

export default function BudgetAllocationPage() {
  const { setTrainingsWithBudget } = useTrainingsWithBudgetStore();
  const { setTotalAmountByYear } = useBudgetAllocationStore();

  const { data: training, isLoading } = useQuery<BudgetAllocationPagePropsT>({
    queryFn: () => getTrainingsBudget(),
  });

  if (isLoading) return <LoadingSpinner />;


  return (
    <div className="my-4">
      <div className="grid grid-cols-12 space-x-8 ">
        <div className="col-span-8 space-y-4">
          <h3 className="text-xl font-semibold">
            Budget Allocation per training
          </h3>
          <TrainingsBudget data={training?.data.trainingsWithBudget!} />
        </div>
        <div className="col-span-4 space-y-4">
          <h3 className="text-xl font-semibold">
            Total Budget Allocation per year
          </h3>
          <TrainingsBudgetTotalAmount
            data={training?.data.totalAmountByYear!}
          />
        </div>
      </div>
    </div>
  );
}
