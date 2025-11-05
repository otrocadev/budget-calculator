export type BudgetInfo = {
  name: string;
  email: string;
  phone: string;
  budgetServices: BudgetService[];
  total: number;
  date: string;
};

export type BudgetService = {
  title: string;
  secondaryServices?: BudgetSecondaryService[];
};

type BudgetSecondaryService = {
  title: string;
  amount: number;
};
