import { ApprovedBudget } from '@prisma/client';

export type CreateApprovedBudgetT = Pick<ApprovedBudget, 'year' | 'amount'>;
export type UpdateApprovedBudgetT = Pick<ApprovedBudget, 'year' | 'amount'>;
