import { TablesForTrainingsBudget } from './(components)/trainings-budget/tables-for-trainings-budget';

export default function BudgetAllocationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Budget Allocation Page</h3>
        {/* <p className="text-sm text-muted-foreground">
          Lorem, ipsum dolor sit amet consectetur adipisicing.
        </p> */}
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6">
          <TablesForTrainingsBudget />
        </div>
      </div>
    </div>
  );
}
