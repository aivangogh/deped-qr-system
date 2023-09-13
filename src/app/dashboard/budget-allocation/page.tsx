import TrainingsBudgetTotalAmount from './(components)/budgets-allocated-per-year/TrainingsBudgetTotalAmount';
import TrainingsBudget from './(components)/trainings-budget/TrainingsBudget';

export default function BudgetAllocationPage() {
  return (
    <div className="my-4">
      <div className="grid grid-cols-12 space-x-8 ">
        <div className="col-span-6 space-y-4">
          <h3 className="text-xl font-semibold">
            Budget Allocation per training
          </h3>
          <TrainingsBudget />
        </div>
        <div className="col-span-5 col-start-7 col-end-12 space-y-4">
          <h3 className="text-xl font-semibold">
            Total Budget Allocation per year
          </h3>
          <TrainingsBudgetTotalAmount />
        </div>
      </div>
    </div>
  );
}
