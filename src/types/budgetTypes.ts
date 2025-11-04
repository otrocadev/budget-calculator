export type BudgetInfo = {
  name: string;
  email: string;
  phone: string;
  budgetServices: BudgetServicesList;
  total: number;
};

export type BudgetServicesList = {
  services: BudgetService[];
};

export type BudgetService = {
  title: string;
  secondaryServices?: BudgetSecondaryService[];
};

type BudgetSecondaryService = {
  title: string;
  amount: number;
};
